import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getEmployeeDetails,
  getOrganizationAllEmployee,
  handleCreateNewEmployee,
  handleUpdateEmployee,
  handleDeleteEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", verifyToken, handleCreateNewEmployee);
router.patch("/:employeeId", verifyToken, handleUpdateEmployee);
router.delete("/:employeeId", verifyToken, handleDeleteEmployee);
router.get("/", verifyToken, getOrganizationAllEmployee);
router.get("/:employeeId", verifyToken, getEmployeeDetails);

export default router;
