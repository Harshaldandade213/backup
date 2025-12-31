import Fee from "../models/fee.model.js";
import { errorResponse, successResponse } from "../utils/response.util.js";

export const handleCreateFee = async (req, res) => {
  try {
    const { organization } = req.user;
    const {
      student,
      academicYear,
      month,
      feeType,
      amount,
      dueDate,
      remarks,
    } = req.body;

    if (!student || !academicYear || !feeType || !amount || !dueDate) {
      return errorResponse(
        res,
        400,
        "Student, academic year, fee type, amount, and due date are required"
      );
    }

    const fee = await Fee.create({
      organization,
      student,
      academicYear,
      month,
      feeType,
      amount,
      dueDate,
      remarks,
      createdBy: req.user._id,
    });

    return successResponse(res, 201, "Fee created successfully", fee);
  } catch (error) {
    console.error("Create fee error:", error);
    return errorResponse(res, 500, error.message || "Failed to create fee");
  }
};

export const getOrganizationFees = async (req, res) => {
  try {
    const { organization } = req.user;
    let { page = 1, limit = 10, status, feeType, studentId } = req.query;

    const filter = { organization };

    if (status) {
      filter.status = status;
    }

    if (feeType) {
      filter.feeType = feeType;
    }

    if (studentId) {
      filter.student = studentId;
    }

    page = parseInt(page);
    limit = parseInt(limit);
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const offset = (page - 1) * limit;

    const fees = await Fee.find(filter)
      .populate("student", "name studentId class section")
      .skip(offset)
      .limit(limit)
      .sort({ dueDate: -1 });

    const totalFees = await Fee.countDocuments(filter);

    return successResponse(res, 200, "Fees fetched successfully", {
      fees,
      meta: {
        total: totalFees,
        page,
        limit,
        totalPages: Math.ceil(totalFees / limit),
      },
    });
  } catch (error) {
    console.error("Fetch fees error:", error);
    return errorResponse(res, 500, error.message || "Failed to fetch fees");
  }
};

export const handlePayFee = async (req, res) => {
  try {
    const { id } = req.params;
    const { amountPaid, paymentMethod, transactionId, paidDate } = req.body;

    if (!amountPaid || !paymentMethod) {
      return errorResponse(
        res,
        400,
        "Amount paid and payment method are required"
      );
    }

    const fee = await Fee.findById(id);

    if (!fee) {
      return errorResponse(res, 404, "Fee not found");
    }

    if (fee.organization.toString() !== req.user.organization.toString()) {
      return errorResponse(
        res,
        403,
        "You are not authorized to update this fee"
      );
    }

    fee.amountPaid = (fee.amountPaid || 0) + parseFloat(amountPaid);
    fee.paymentMethod = paymentMethod;
    fee.transactionId = transactionId;
    fee.paidDate = paidDate || new Date();

    await fee.save();

    return successResponse(res, 200, "Payment recorded successfully", fee);
  } catch (error) {
    console.error("Pay fee error:", error);
    return errorResponse(res, 500, error.message || "Failed to record payment");
  }
};

export const handleDeleteFee = async (req, res) => {
  try {
    const { id } = req.params;

    const fee = await Fee.findById(id);

    if (!fee) {
      return errorResponse(res, 404, "Fee not found");
    }

    if (fee.organization.toString() !== req.user.organization.toString()) {
      return errorResponse(
        res,
        403,
        "You are not authorized to delete this fee"
      );
    }

    await Fee.deleteOne({ _id: id });

    return successResponse(res, 200, "Fee deleted successfully");
  } catch (error) {
    console.error("Delete fee error:", error);
    return errorResponse(res, 500, error.message || "Failed to delete fee");
  }
};
