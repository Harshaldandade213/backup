import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  handleGenerateSalary,
  getOrganizationSalaries,
  handlePaySalary,
  handleUpdateSalary,
  handleDeleteSalary,
} from "../controllers/salary.controller.js";

const router = express.Router();

router.post("/", verifyToken, handleGenerateSalary);
router.get("/", verifyToken, getOrganizationSalaries);
router.patch("/:id", verifyToken, handleUpdateSalary);
router.patch("/:id/pay", verifyToken, handlePaySalary);
router.delete("/:id", verifyToken, handleDeleteSalary);

export default router;
