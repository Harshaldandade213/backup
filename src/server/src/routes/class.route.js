import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  handleCreateClass,
  getOrganizationClasses,
  getClassDetails,
  handleUpdateClass,
  handleDeleteClass,
} from "../controllers/class.controller.js";

const router = express.Router();

router.post("/", verifyToken, handleCreateClass);
router.get("/", verifyToken, getOrganizationClasses);
router.get("/:id", verifyToken, getClassDetails);
router.patch("/:id", verifyToken, handleUpdateClass);
router.delete("/:id", verifyToken, handleDeleteClass);

export default router;
