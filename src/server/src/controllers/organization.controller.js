import Organization from "../models/organization.model.js";
import User from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/response.util.js";
import mongoose from "mongoose";

export const handleCreateOrganization = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { name, address, contactEmail, contactPhone, principalName, establishedYear, website } = req.body;

    if (!name || !contactEmail) {
      await session.abortTransaction();
      session.endSession();
      return errorResponse(res, 400, "Name and contact email are required");
    }

    const organization = await Organization.create(
      [
        {
          name,
          address,
          contactEmail,
          contactPhone,
          principalName,
          establishedYear,
          website,
          createdBy: req.user._id,
        },
      ],
      { session }
    );

    // Update user's organization
    await User.findByIdAndUpdate(
      req.user._id,
      {
        organization: organization[0]._id,
        isOrganizationConfigured: true,
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return successResponse(
      res,
      201,
      "Organization created successfully",
      organization[0]
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Create organization error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to create organization"
    );
  }
};

export const getOrganizationDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const organization = await Organization.findById(id);

    if (!organization) {
      return errorResponse(res, 404, "Organization not found");
    }

    return successResponse(
      res,
      200,
      "Organization fetched successfully",
      organization
    );
  } catch (error) {
    console.error("Fetch organization error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to fetch organization"
    );
  }
};

export const handleUpdateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const organization = await Organization.findById(id);

    if (!organization) {
      return errorResponse(res, 404, "Organization not found");
    }

    // Check if user owns this organization
    if (organization.createdBy.toString() !== req.user._id.toString()) {
      return errorResponse(
        res,
        403,
        "You are not authorized to update this organization"
      );
    }

    Object.assign(organization, updates);
    await organization.save();

    return successResponse(
      res,
      200,
      "Organization updated successfully",
      organization
    );
  } catch (error) {
    console.error("Update organization error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to update organization"
    );
  }
};

export const getAllOrganizations = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const offset = (page - 1) * limit;

    const organizations = await Organization.find()
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalOrganizations = await Organization.countDocuments();

    return successResponse(res, 200, "Organizations fetched successfully", {
      organizations,
      meta: {
        total: totalOrganizations,
        page,
        limit,
        totalPages: Math.ceil(totalOrganizations / limit),
      },
    });
  } catch (error) {
    console.error("Fetch organizations error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to fetch organizations"
    );
  }
};
