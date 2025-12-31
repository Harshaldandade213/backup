import EmployeeModel from "../models/employee.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";
import { errorResponse, successResponse } from "../utils/response.util.js";

export const handleCreateNewEmployee = async (req, res) => {
  const { organization } = req.user;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      role,
      department,
      joiningDate,
      employeeId,
      address,
      bank,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !role) {
      await session.abortTransaction();
      session.endSession();
      return errorResponse(res, 400, "Missing required fields");
    }

    const isEmailInUse = await UserModel.findOne({ email }).session(session);
    if (isEmailInUse) {
      await session.abortTransaction();
      session.endSession();
      return errorResponse(res, 400, "Email already in use");
    }

    const employee = await EmployeeModel.create(
      [
        {
          organization,
          firstName,
          lastName,
          email,
          phone,
          dob,
          gender,
          role,
          department,
          joiningDate,
          employeeId,
          address: {
            street: address?.street || "",
            city: address?.city || "",
            state: address?.state || "",
            country: address?.country || "INDIA",
            zipCode: address?.zipCode || "",
          },
          bank: {
            accountHolderName: bank?.accountHolderName || "",
            accountNumber: bank?.accountNumber || "",
            ifscCode: bank?.ifscCode || "",
            bankName: bank?.bankName || "",
          },
        },
      ],
      { session }
    );

    const user = await UserModel.create(
      [
        {
          name: firstName + " " + lastName,
          role: "EMPLOYEE",
          password: email,
          email,
          employee: employee[0]?._id,
          organization,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return successResponse(
      res,
      201,
      "Employee created successfully",
      employee[0]
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Create employee error:", error);
    return errorResponse(res, 500, "Failed to create employee", error.message);
  }
};

export const handleUpdateEmployee = async (req, res) => {
  const { employeeId } = req.params;
  const updateData = req.body;

  if (!employeeId) return errorResponse(res, 400, "Employee ID is required");

  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: employeeId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!employee) return errorResponse(res, 404, "Employee not found");

    return successResponse(res, 200, "Employee updated successfully", employee);
  } catch (error) {
    console.error("Update employee error:", error);
    return errorResponse(res, 500, "Failed to update employee", error.message);
  }
};

export const getOrganizationAllEmployee = async (req, res) => {
  const { organization } = req.user;
  let { page = 1, limit = 10 } = req.query;

  try {
    page = parseInt(page);
    limit = parseInt(limit);
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const offset = (page - 1) * limit;

    const employees = await EmployeeModel.find({ organization })
      .skip(offset)
      .limit(limit)
      .sort({ joiningDate: -1 });

    const totalEmployees = await EmployeeModel.countDocuments({ organization });

    return successResponse(res, 200, "Employees fetched successfully", {
      employees,
      meta: {
        total: totalEmployees,
        page,
        limit,
        totalPages: Math.ceil(totalEmployees / limit),
      },
    });
  } catch (error) {
    console.error("Fetch employees error:", error);
    return errorResponse(res, 500, "Failed to fetch employees", error.message);
  }
};

export const getEmployeeDetails = async (req, res) => {
  const { employeeId } = req.params;

  if (!employeeId) return errorResponse(res, 400, "Employee ID is required");

  try {
    const employee = await EmployeeModel.findOne({ _id: employeeId });
    if (!employee) return errorResponse(res, 404, "Employee not found");

    return successResponse(res, 200, "Employee fetched successfully", employee);
  } catch (error) {
    console.error("Fetch employee error:", error);
    return errorResponse(res, 500, "Failed to fetch employee", error.message);
  }
};

export const handleDeleteEmployee = async (req, res) => {
  const { employeeId } = req.params;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const employee = await EmployeeModel.findById(employeeId).session(session);
    if (!employee) {
      await session.abortTransaction();
      session.endSession();
      return errorResponse(res, 404, "Employee not found");
    }

    // Delete associated user account
    await UserModel.deleteOne({ employee: employeeId }).session(session);

    // Delete employee
    await EmployeeModel.deleteOne({ _id: employeeId }).session(session);

    await session.commitTransaction();
    session.endSession();

    return successResponse(res, 200, "Employee deleted successfully");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Delete employee error:", error);
    return errorResponse(res, 500, "Failed to delete employee", error.message);
  }
};
