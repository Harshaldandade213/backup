import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  handleCreateFee,
  getOrganizationFees,
  handlePayFee,
  handleDeleteFee,
} from "../controllers/fee.controller.js";

const router = express.Router();

router.post("/", verifyToken, handleCreateFee);
router.get("/", verifyToken, getOrganizationFees);
router.patch("/:id/pay", verifyToken, handlePayFee);
router.delete("/:id", verifyToken, handleDeleteFee);

export default router;
