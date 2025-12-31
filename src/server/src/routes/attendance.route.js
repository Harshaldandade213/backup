import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  handleMarkAttendance,
  handleBulkMarkAttendance,
  getAttendance,
  getAttendanceReport,
  handleDeleteAttendance,
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/", verifyToken, handleMarkAttendance);
router.post("/bulk", verifyToken, handleBulkMarkAttendance);
router.get("/", verifyToken, getAttendance);
router.get("/report", verifyToken, getAttendanceReport);
router.delete("/:id", verifyToken, handleDeleteAttendance);

export default router;
