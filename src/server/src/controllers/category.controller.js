import Category from "../models/category.model.js";
import { errorResponse, successResponse } from "../utils/response.util.js";

export const handleCreateCategory = async (req, res) => {
  try {
    const { organization } = req.user;
    const { name, type, description } = req.body;

    if (!name || !type) {
      return errorResponse(res, 400, "Name and type are required");
    }

    const category = await Category.create({
      organization,
      name,
      type,
      description,
      createdBy: req.user._id,
    });

    return successResponse(
      res,
      201,
      "Category created successfully",
      category
    );
  } catch (error) {
    console.error("Create category error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to create category"
    );
  }
};

export const getOrganizationCategories = async (req, res) => {
  try {
    const { organization } = req.user;
    const { type } = req.query;

    const filter = { organization };
    if (type) {
      filter.type = type;
    }

    const categories = await Category.find(filter).sort({ createdAt: -1 });

    return successResponse(
      res,
      200,
      "Categories fetched successfully",
      categories
    );
  } catch (error) {
    console.error("Fetch categories error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to fetch categories"
    );
  }
};

export const handleUpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return errorResponse(res, 404, "Category not found");
    }

    if (category.organization.toString() !== req.user.organization.toString()) {
      return errorResponse(
        res,
        403,
        "You are not authorized to update this category"
      );
    }

    Object.assign(category, updates);
    await category.save();

    return successResponse(
      res,
      200,
      "Category updated successfully",
      category
    );
  } catch (error) {
    console.error("Update category error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to update category"
    );
  }
};

export const handleDeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return errorResponse(res, 404, "Category not found");
    }

    if (category.organization.toString() !== req.user.organization.toString()) {
      return errorResponse(
        res,
        403,
        "You are not authorized to delete this category"
      );
    }

    await Category.deleteOne({ _id: id });

    return successResponse(res, 200, "Category deleted successfully");
  } catch (error) {
    console.error("Delete category error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to delete category"
    );
  }
};
