import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  handleCreateOrganization,
  getOrganizationDetails,
  handleUpdateOrganization,
  getAllOrganizations,
} from "../controllers/organization.controller.js";

const router = express.Router();

router.post("/", verifyToken, handleCreateOrganization);
router.get("/", verifyToken, getAllOrganizations);
router.get("/:id", verifyToken, getOrganizationDetails);
router.patch("/:id", verifyToken, handleUpdateOrganization);

export default router;
