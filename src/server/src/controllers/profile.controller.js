import User from "../models/user.model.js";
import Employee from "../models/employee.model.js";
import { errorResponse, successResponse } from "../utils/response.util.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("organization", "name code contactEmail")
      .populate("employee");

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    return successResponse(res, 200, "Profile fetched successfully", user);
  } catch (error) {
    console.error("Fetch profile error:", error);
    return errorResponse(res, 500, error.message || "Failed to fetch profile");
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    // Check if email is being changed and is already in use
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return errorResponse(res, 400, "Email already in use");
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    await user.save();

    const updatedUser = await User.findById(req.user._id)
      .select("-password")
      .populate("organization", "name code contactEmail");

    return successResponse(
      res,
      200,
      "Profile updated successfully",
      updatedUser
    );
  } catch (error) {
    console.error("Update profile error:", error);
    return errorResponse(res, 500, error.message || "Failed to update profile");
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return errorResponse(
        res,
        400,
        "Current password and new password are required"
      );
    }

    if (newPassword.length < 6) {
      return errorResponse(
        res,
        400,
        "New password must be at least 6 characters"
      );
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);

    if (!isPasswordCorrect) {
      return errorResponse(res, 401, "Current password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    return successResponse(res, 200, "Password changed successfully");
  } catch (error) {
    console.error("Change password error:", error);
    return errorResponse(
      res,
      500,
      error.message || "Failed to change password"
    );
  }
};
