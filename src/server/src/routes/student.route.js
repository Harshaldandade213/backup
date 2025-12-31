import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  handleAddStudent,
  handleAddBulkStudents,
  getOrganizationStudents,
  handleEditStudent,
  handleDeleteStudent,
  getStudentByNameOrId,
  getStudentDetails,
  handlePromoteStudents,
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", verifyToken, handleAddStudent);
router.post("/bulk", verifyToken, handleAddBulkStudents);
router.post("/promote", verifyToken, handlePromoteStudents);
router.get("/organization/:organization", verifyToken, getOrganizationStudents);
router.get("/search/:query", verifyToken, getStudentByNameOrId);
router.get("/:id", verifyToken, getStudentDetails);
router.patch("/:id", verifyToken, handleEditStudent);
router.delete("/:id", verifyToken, handleDeleteStudent);

export default router;
