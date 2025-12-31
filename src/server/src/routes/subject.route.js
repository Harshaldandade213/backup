import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  handleCreateSubject,
  getOrganizationSubjects,
  handleUpdateSubject,
  handleDeleteSubject,
} from "../controllers/subject.controller.js";

const router = express.Router();

router.post("/", verifyToken, handleCreateSubject);
router.get("/", verifyToken, getOrganizationSubjects);
router.patch("/:id", verifyToken, handleUpdateSubject);
router.delete("/:id", verifyToken, handleDeleteSubject);

export default router;
