import Subject from "../models/subject.model.js";
import { errorResponse, successResponse } from "../utils/response.util.js";

export const handleCreateSubject = async (req, res) => {
  try {
    const { organization } = req.user;
    const { name, code, description, teacher, classes, category } = req.body;

    if (!name || !code) {
      return errorResponse(res, 400, "Name and code are required");
    }

    const subject = await Subject.create({
      organization,
      name,
      code,
      description,
      teacher,
      classes,
      category,
    });

    return successResponse(res, 201, "Subject created successfully", subject);
  } catch (error) {
    console.error("Create subject error:", error);
    return errorResponse(res, 500, error.message || "Failed to create subject");
  }
};

export const getOrganizationSubjects = async (req, res) => {
  try {
    const { organization } = req.user;

    const subjects = await Subject.find({ organization })
      .populate("teacher", "firstName lastName email")
      .populate("classes", "name section")
      .sort({ name: 1 });

    return successResponse(res, 200, "Subjects fetched successfully", subjects);
  } catch (error) {
    console.error("Fetch subjects error:", error);
    return errorResponse(res, 500, error.message || "Failed to fetch subjects");
  }
};

export const handleUpdateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const subject = await Subject.findById(id);

    if (!subject) {
      return errorResponse(res, 404, "Subject not found");
    }

    if (subject.organization.toString() !== req.user.organization.toString()) {
      return errorResponse(
        res,
        403,
        "You are not authorized to update this subject"
      );
    }

    Object.assign(subject, updates);
    await subject.save();

    return successResponse(res, 200, "Subject updated successfully", subject);
  } catch (error) {
    console.error("Update subject error:", error);
    return errorResponse(res, 500, error.message || "Failed to update subject");
  }
};

export const handleDeleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findById(id);

    if (!subject) {
      return errorResponse(res, 404, "Subject not found");
    }

    if (subject.organization.toString() !== req.user.organization.toString()) {
      return errorResponse(
        res,
        403,
        "You are not authorized to delete this subject"
      );
    }

    await Subject.deleteOne({ _id: id });

    return successResponse(res, 200, "Subject deleted successfully");
  } catch (error) {
    console.error("Delete subject error:", error);
    return errorResponse(res, 500, error.message || "Failed to delete subject");
  }
};
