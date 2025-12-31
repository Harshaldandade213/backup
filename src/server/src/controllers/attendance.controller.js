import Attendance from "../models/attendance.model.js";
import { errorResponse, successResponse } from "../utils/response.util.js";

export const handleMarkAttendance = async (req, res) => {
  try {
    const { organization } = req.user;
    const {
      attendanceType,
      student,
      employee,
      date,
      status,
      checkInTime,
      checkOutTime,
      remarks,
    } = req.body;

    if (!attendanceType || !date || !status) {
      return errorResponse(
        res,
        400,
        "Attendance type, date, and status are required"
      );
    }

    if (attendanceType === "STUDENT" && !student) {
      return errorResponse(res, 400, "Student ID is required");
    }

    if (attendanceType === "EMPLOYEE" && !employee) {
      return errorResponse(res, 400, "Employee ID is required");
    }

    // Check if attendance already exists for this date
    const existingAttendance = await Attendance.findOne({
      organization,
      date,
      ...(student && { student }),
      ...(employee && { employee }),
    });

    if (existingAttendance) {
      // Update existing attendance
      existingAttendance.status = status;
      existingAttendance.checkInTime = checkInTime;
      existingAttendance.checkOutTime = checkOutTime;
      existingAttendance.remarks = remarks;
      existingAttendance.markedBy = req.user._id;
      await existingAttendance.save();

      return successResponse(
        res,
        200,
        "Attendance updated successfully",
        existingAttendance
      );
    }

    const attendance = await Attendance.create({
      organization,
      attendanceType,
      student,
      employee,
      date,
      status,
      checkInTime,
      checkOutTime,
      remarks,
      markedBy: req.user._id,
    });

    return successResponse(
      res,
      201,
      "Attendance marked successfully",
      attendance
    );
  } catch (error) {
    console.error("Mark attendance error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to mark attendance"
    );
  }
};

export const handleBulkMarkAttendance = async (req, res) => {
  try {
    const { organization } = req.user;
    const { attendanceType, attendanceRecords } = req.body;

    if (!attendanceRecords || !Array.isArray(attendanceRecords)) {
      return errorResponse(res, 400, "Attendance records array is required");
    }

    const bulkOps = attendanceRecords.map((record) => ({
      updateOne: {
        filter: {
          organization,
          date: record.date,
          ...(record.student && { student: record.student }),
          ...(record.employee && { employee: record.employee }),
        },
        update: {
          $set: {
            organization,
            attendanceType,
            status: record.status,
            checkInTime: record.checkInTime,
            checkOutTime: record.checkOutTime,
            remarks: record.remarks,
            markedBy: req.user._id,
            ...(record.student && { student: record.student }),
            ...(record.employee && { employee: record.employee }),
            date: record.date,
          },
        },
        upsert: true,
      },
    }));

    const result = await Attendance.bulkWrite(bulkOps);

    return successResponse(
      res,
      200,
      `Bulk attendance marked successfully - ${result.modifiedCount + result.upsertedCount} records updated`,
      {
        modified: result.modifiedCount,
        inserted: result.upsertedCount,
      }
    );
  } catch (error) {
    console.error("Bulk mark attendance error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to mark bulk attendance"
    );
  }
};

export const getAttendance = async (req, res) => {
  try {
    const { organization } = req.user;
    const {
      attendanceType,
      startDate,
      endDate,
      studentId,
      employeeId,
      status,
    } = req.query;

    const filter = { organization };

    if (attendanceType) {
      filter.attendanceType = attendanceType;
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (studentId) {
      filter.student = studentId;
    }

    if (employeeId) {
      filter.employee = employeeId;
    }

    if (status) {
      filter.status = status;
    }

    const attendance = await Attendance.find(filter)
      .populate("student", "name studentId class section")
      .populate("employee", "firstName lastName employeeId role")
      .sort({ date: -1 });

    return successResponse(
      res,
      200,
      "Attendance records fetched successfully",
      attendance
    );
  } catch (error) {
    console.error("Fetch attendance error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to fetch attendance"
    );
  }
};

export const getAttendanceReport = async (req, res) => {
  try {
    const { organization } = req.user;
    const { attendanceType, month, year } = req.query;

    if (!month || !year) {
      return errorResponse(res, 400, "Month and year are required");
    }

    // Get first and last day of the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const filter = {
      organization,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    if (attendanceType) {
      filter.attendanceType = attendanceType;
    }

    const attendance = await Attendance.find(filter)
      .populate("student", "name studentId class section")
      .populate("employee", "firstName lastName employeeId role");

    // Calculate statistics
    const stats = {
      totalRecords: attendance.length,
      present: attendance.filter((a) => a.status === "PRESENT").length,
      absent: attendance.filter((a) => a.status === "ABSENT").length,
      late: attendance.filter((a) => a.status === "LATE").length,
      halfDay: attendance.filter((a) => a.status === "HALF_DAY").length,
      leave: attendance.filter((a) => a.status === "LEAVE").length,
    };

    return successResponse(res, 200, "Attendance report fetched successfully", {
      attendance,
      stats,
      month,
      year,
    });
  } catch (error) {
    console.error("Fetch attendance report error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to fetch attendance report"
    );
  }
};

export const handleDeleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return errorResponse(res, 404, "Attendance record not found");
    }

    if (
      attendance.organization.toString() !== req.user.organization.toString()
    ) {
      return errorResponse(
        res,
        403,
        "You are not authorized to delete this attendance record"
      );
    }

    await Attendance.deleteOne({ _id: id });

    return successResponse(res, 200, "Attendance record deleted successfully");
  } catch (error) {
    console.error("Delete attendance error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to delete attendance"
    );
  }
};
