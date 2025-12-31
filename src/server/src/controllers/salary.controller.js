import Salary from "../models/salary.model.js";
import { errorResponse, successResponse } from "../utils/response.util.js";

export const handleGenerateSalary = async (req, res) => {
  try {
    const { organization } = req.user;
    const {
      employee,
      month,
      year,
      basicSalary,
      allowances,
      deductions,
      workingDays,
      presentDays,
    } = req.body;

    if (!employee || !month || !year || !basicSalary) {
      return errorResponse(
        res,
        400,
        "Employee, month, year, and basic salary are required"
      );
    }

    // Check if salary already exists for this month-year
    const existingSalary = await Salary.findOne({
      organization,
      employee,
      month,
      year,
    });

    if (existingSalary) {
      return errorResponse(
        res,
        400,
        `Salary for ${month} ${year} already generated for this employee`
      );
    }

    const salary = await Salary.create({
      organization,
      employee,
      month,
      year,
      basicSalary,
      allowances,
      deductions,
      workingDays,
      presentDays,
      generatedBy: req.user._id,
    });

    return successResponse(res, 201, "Salary generated successfully", salary);
  } catch (error) {
    console.error("Generate salary error:", error);
    return errorResponse(res, 500, error.message || "Failed to generate salary");
  }
};

export const getOrganizationSalaries = async (req, res) => {
  try {
    const { organization } = req.user;
    let { page = 1, limit = 10, status, month, year, employeeId } = req.query;

    const filter = { organization };

    if (status) {
      filter.status = status;
    }

    if (month) {
      filter.month = month;
    }

    if (year) {
      filter.year = parseInt(year);
    }

    if (employeeId) {
      filter.employee = employeeId;
    }

    page = parseInt(page);
    limit = parseInt(limit);
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const offset = (page - 1) * limit;

    const salaries = await Salary.find(filter)
      .populate("employee", "firstName lastName employeeId role")
      .skip(offset)
      .limit(limit)
      .sort({ year: -1, month: -1 });

    const totalSalaries = await Salary.countDocuments(filter);

    return successResponse(res, 200, "Salaries fetched successfully", {
      salaries,
      meta: {
        total: totalSalaries,
        page,
        limit,
        totalPages: Math.ceil(totalSalaries / limit),
      },
    });
  } catch (error) {
    console.error("Fetch salaries error:", error);
    return errorResponse(res, 500, error.message || "Failed to fetch salaries");
  }
};

export const handlePaySalary = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethod, transactionId, paymentDate } = req.body;

    if (!paymentMethod) {
      return errorResponse(res, 400, "Payment method is required");
    }

    const salary = await Salary.findById(id);

    if (!salary) {
      return errorResponse(res, 404, "Salary not found");
    }

    if (salary.organization.toString() !== req.user.organization.toString()) {
      return errorResponse(
        res,
        403,
        "You are not authorized to update this salary"
      );
    }

    salary.paymentMethod = paymentMethod;
    salary.transactionId = transactionId;
    salary.paymentDate = paymentDate || new Date();
    salary.status = "PAID";

    await salary.save();

    return successResponse(res, 200, "Salary payment recorded successfully", salary);
  } catch (error) {
    console.error("Pay salary error:", error);
    return errorResponse(res, 500, error.message || "Failed to record payment");
  }
};

export const handleUpdateSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const salary = await Salary.findById(id);

    if (!salary) {
      return errorResponse(res, 404, "Salary not found");
    }

    if (salary.organization.toString() !== req.user.organization.toString()) {
      return errorResponse(
        res,
        403,
        "You are not authorized to update this salary"
      );
    }

    if (salary.status === "PAID") {
      return errorResponse(res, 400, "Cannot update paid salary");
    }

    Object.assign(salary, updates);
    await salary.save();

    return successResponse(res, 200, "Salary updated successfully", salary);
  } catch (error) {
    console.error("Update salary error:", error);
    return errorResponse(res, 500, error.message || "Failed to update salary");
  }
};

export const handleDeleteSalary = async (req, res) => {
  try {
    const { id } = req.params;

    const salary = await Salary.findById(id);

    if (!salary) {
      return errorResponse(res, 404, "Salary not found");
    }

    if (salary.organization.toString() !== req.user.organization.toString()) {
      return errorResponse(
        res,
        403,
        "You are not authorized to delete this salary"
      );
    }

    if (salary.status === "PAID") {
      return errorResponse(res, 400, "Cannot delete paid salary");
    }

    await Salary.deleteOne({ _id: id });

    return successResponse(res, 200, "Salary deleted successfully");
  } catch (error) {
    console.error("Delete salary error:", error);
    return errorResponse(res, 500, error.message || "Failed to delete salary");
  }
};
