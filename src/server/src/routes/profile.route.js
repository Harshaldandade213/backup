import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/", verifyToken, getProfile);
router.patch("/", verifyToken, updateProfile);
router.patch("/change-password", verifyToken, changePassword);

export default router;
