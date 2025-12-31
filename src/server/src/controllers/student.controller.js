import Student from "../models/student.model.js";
import { isUserPartOfOrganization } from "../utils/authorization.js";
import { errorResponse, successResponse } from "../utils/response.util.js";

export const handleAddStudent = async (req, res) => {
  try {
    const { organization, name, class: studentClass, studentId } = req.body;

    if (!isUserPartOfOrganization(req.user?.organization, organization)) {
      return errorResponse(
        res,
        403,
        "You are not authorized for this organization"
      );
    }

    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return errorResponse(
        res,
        400,
        `Student ID ${studentId} already exists for ${existingStudent.name}`
      );
    }

    const student = await Student.create({
      organization,
      name,
      class: studentClass,
      studentId,
      ...req.body,
    });

    return successResponse(res, 201, "Student registered successfully", student);
  } catch (error) {
    console.error("Add student error:", error);
    return errorResponse(res, 500, error.message || "Failed to add student");
  }
};

export const handleAddBulkStudents = async (req, res) => {
  try {
    const { organization, students } = req.body;

    if (!isUserPartOfOrganization(req.user?.organization, organization)) {
      return errorResponse(
        res,
        403,
        "You are not authorized for this organization"
      );
    }

    if (!Array.isArray(students) || students.length === 0) {
      return errorResponse(res, 400, "Students list is required");
    }

    const existingStudents = await Student.find({
      studentId: { $in: students.map((s) => s.studentId) },
    }).lean();

    if (existingStudents.length > 0) {
      return errorResponse(
        res,
        400,
        `Duplicate found: ${existingStudents[0].studentId} already exists for ${existingStudents[0].name}`
      );
    }

    const cleanedStudents = students.map((s) => ({
      organization,
      name: s.name,
      class: s.class,
      studentId: s.studentId,
      section: s.section,
      rollNumber: s.rollNumber,
      gender: s.gender,
      dateOfBirth: s.dateOfBirth,
      guardianName: s.guardianName,
      guardianContact: s.guardianContact,
      contactNumber: s.contactNumber,
      email: s.email,
      address: s.address,
    }));

    const result = await Student.insertMany(cleanedStudents);

    return successResponse(
      res,
      201,
      `${result.length} students registered successfully`,
      { count: result.length }
    );
  } catch (error) {
    console.error("Bulk add students error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to add bulk students"
    );
  }
};

export const getOrganizationStudents = async (req, res) => {
  try {
    const { organization } = req.params;
    let {
      page = 1,
      limit = 10,
      query,
      class: studentClass,
      section,
    } = req.query;

    if (!organization) {
      return errorResponse(res, 400, "Organization parameter is required");
    }

    const filter = { organization };

    if (query) {
      const regex = new RegExp(query, "i");
      filter.$or = [{ name: regex }, { studentId: regex }];
    }

    if (studentClass && studentClass !== "all") {
      filter.class = studentClass;
    }

    if (section && section !== "all") {
      filter.section = section;
    }

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const totalStudents = await Student.countDocuments(filter);

    const students = await Student.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Students fetched successfully", {
      students,
      pagination: {
        total: totalStudents,
        page,
        limit,
        totalPages: Math.ceil(totalStudents / limit),
        hasNextPage: page < Math.ceil(totalStudents / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return errorResponse(res, 500, error.message || "Failed to fetch students");
  }
};

export const handleEditStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const student = await Student.findById(id);
    if (!student) {
      return errorResponse(res, 404, "Student not found");
    }

    if (
      !isUserPartOfOrganization(req.user?.organization, student.organization)
    ) {
      return errorResponse(
        res,
        403,
        "You are not authorized to edit this student"
      );
    }

    Object.assign(student, updates);
    await student.save();

    return successResponse(
      res,
      200,
      "Student details updated successfully",
      student
    );
  } catch (error) {
    console.error("Update student error:", error);
    return errorResponse(res, 500, error.message || "Failed to update student");
  }
};

export const handleDeleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return errorResponse(res, 404, "Student not found");
    }

    if (
      !isUserPartOfOrganization(req.user?.organization, student.organization)
    ) {
      return errorResponse(
        res,
        403,
        "You are not authorized to delete this student"
      );
    }

    await Student.deleteOne({ _id: id });

    return successResponse(res, 200, "Student deleted successfully");
  } catch (error) {
    console.error("Delete student error:", error);
    return errorResponse(res, 500, error.message || "Failed to delete student");
  }
};

export const getStudentByNameOrId = async (req, res) => {
  try {
    const { organization } = req.user;
    const { query } = req.params;

    if (!organization) {
      return errorResponse(res, 400, "Organization ID is required");
    }

    const regex = new RegExp(query, "i");
    const students = await Student.find({
      organization,
      $or: [{ name: regex }, { studentId: regex }],
    }).select("name studentId class section rollNumber");

    return successResponse(res, 200, "Students fetched successfully", students);
  } catch (error) {
    console.error("Error fetching student by name or ID:", error);
    return errorResponse(res, 500, error.message || "Failed to fetch student");
  }
};

export const getStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return errorResponse(res, 404, "Student not found");
    }

    if (
      !isUserPartOfOrganization(req.user?.organization, student.organization)
    ) {
      return errorResponse(
        res,
        403,
        "You are not authorized to view this student"
      );
    }

    return successResponse(res, 200, "Student fetched successfully", student);
  } catch (error) {
    console.error("Fetch student error:", error);
    return errorResponse(res, 500, error.message || "Failed to fetch student");
  }
};

export const handlePromoteStudents = async (req, res) => {
  try {
    const { studentIds, toClass, toSection } = req.body;
    const { organization } = req.user;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return errorResponse(res, 400, "Student IDs are required");
    }

    if (!toClass) {
      return errorResponse(res, 400, "Target class is required");
    }

    const result = await Student.updateMany(
      {
        _id: { $in: studentIds },
        organization,
      },
      {
        $set: {
          class: toClass,
          ...(toSection && { section: toSection }),
        },
      }
    );

    return successResponse(
      res,
      200,
      `${result.modifiedCount} students promoted successfully`,
      { count: result.modifiedCount }
    );
  } catch (error) {
    console.error("Promote students error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to promote students"
    );
  }
};
