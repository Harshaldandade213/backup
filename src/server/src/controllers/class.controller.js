import Class from "../models/class.model.js";
import { errorResponse, successResponse } from "../utils/response.util.js";

export const handleCreateClass = async (req, res) => {
  try {
    const { organization } = req.user;
    const { name, section, classTeacher, subjects, tuitionFee, capacity, academicYear } = req.body;

    if (!name || !section || !academicYear) {
      return errorResponse(res, 400, "Name, section, and academic year are required");
    }

    const existingClass = await Class.findOne({
      organization,
      name,
      section,
    });

    if (existingClass) {
      return errorResponse(
        res,
        400,
        `Class ${name}-${section} already exists`
      );
    }

    const classData = await Class.create({
      organization,
      name,
      section,
      classTeacher,
      subjects,
      tuitionFee,
      capacity,
      academicYear,
    });

    return successResponse(res, 201, "Class created successfully", classData);
  } catch (error) {
    console.error("Create class error:", error);
    return errorResponse(res, 500, error.message || "Failed to create class");
  }
};

export const getOrganizationClasses = async (req, res) => {
  try {
    const { organization } = req.user;
    const { academicYear } = req.query;

    const filter = { organization };
    if (academicYear) {
      filter.academicYear = academicYear;
    }

    const classes = await Class.find(filter)
      .populate("classTeacher", "firstName lastName email")
      .populate("subjects", "name code")
      .sort({ name: 1, section: 1 });

    return successResponse(res, 200, "Classes fetched successfully", classes);
  } catch (error) {
    console.error("Fetch classes error:", error);
    return errorResponse(res, 500, error.message || "Failed to fetch classes");
  }
};

export const getClassDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const classData = await Class.findById(id)
      .populate("classTeacher", "firstName lastName email phone")
      .populate("subjects", "name code teacher");

    if (!classData) {
      return errorResponse(res, 404, "Class not found");
    }

    return successResponse(res, 200, "Class fetched successfully", classData);
  } catch (error) {
    console.error("Fetch class error:", error);
    return errorResponse(res, 500, error.message || "Failed to fetch class");
  }
};

export const handleUpdateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const classData = await Class.findById(id);

    if (!classData) {
      return errorResponse(res, 404, "Class not found");
    }

    if (classData.organization.toString() !== req.user.organization.toString()) {
      return errorResponse(
        res,
        403,
        "You are not authorized to update this class"
      );
    }

    Object.assign(classData, updates);
    await classData.save();

    return successResponse(res, 200, "Class updated successfully", classData);
  } catch (error) {
    console.error("Update class error:", error);
    return errorResponse(res, 500, error.message || "Failed to update class");
  }
};

export const handleDeleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const classData = await Class.findById(id);

    if (!classData) {
      return errorResponse(res, 404, "Class not found");
    }

    if (classData.organization.toString() !== req.user.organization.toString()) {
      return errorResponse(
        res,
        403,
        "You are not authorized to delete this class"
      );
    }

    await Class.deleteOne({ _id: id });

    return successResponse(res, 200, "Class deleted successfully");
  } catch (error) {
    console.error("Delete class error:", error);
    return errorResponse(res, 500, error.message || "Failed to delete class");
  }
};
