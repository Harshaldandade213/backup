import User from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/response.util.js";
import { createAccessToken, createRefreshToken } from "../utils/token.utils.js";
import jwt from "jsonwebtoken";

export const handleRegisterAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const isEmailAvailable = await User.findOne({
      email,
    });

    if (isEmailAvailable) {
      return errorResponse(res, 400, "Email already in use");
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "ADMIN",
    });

    const accessToken = await createAccessToken(user?._id);
    const refreshToken = await createRefreshToken(user?._id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000 * 24,
    });

    return successResponse(res, 201, "User registered successfully", {
      name: user?.name,
      email: user?.email,
      role: user?.role,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return errorResponse(res, 500, error?.message);
  }
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return errorResponse(res, 400, "Email and password are required");
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (!user.isActive) {
      return errorResponse(res, 403, "Account is inactive");
    }

    const isPasswordMatched = await user.isPasswordCorrect(password);
    if (!isPasswordMatched) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const accessToken = await createAccessToken(user?._id);
    const refreshToken = await createRefreshToken(user?._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000 * 24 * 7,
    });

    return successResponse(res, 200, "Login successful", {
      name: user?.name,
      email: user?.email,
      role: user?.role,
      accessToken: accessToken,
      isOrganizationConfigured: user?.isOrganizationConfigured,
      organization: user?.organization,
    });
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse(res, 500, "Internal server error");
  }
};

export const handleLogout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return successResponse(res, 200, "Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    return errorResponse(res, 500, error?.message);
  }
};

export const handleVerifyToken = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("Token verification error:", err);

      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Token has expired" });
      }

      if (err.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }

      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }

    const user = await User.findById(decodedToken.userId)
      .select("-password")
      .populate("organization", "_id name code");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    if (!user.isActive) {
      return res
        .status(403)
        .json({ success: false, message: "Account is inactive" });
    }

    return res.status(200).json({
      success: true,
      message: "User is logged in",
      data: {
        name: user?.name,
        email: user?.email,
        role: user?.role,
        organization: user?.organization,
        isOrganizationConfigured: user?.isOrganizationConfigured,
      },
    });
  } catch (error) {
    console.error("Verify token error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
