import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  handleCreateCategory,
  getOrganizationCategories,
  handleUpdateCategory,
  handleDeleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", verifyToken, handleCreateCategory);
router.get("/", verifyToken, getOrganizationCategories);
router.patch("/:id", verifyToken, handleUpdateCategory);
router.delete("/:id", verifyToken, handleDeleteCategory);

export default router;
