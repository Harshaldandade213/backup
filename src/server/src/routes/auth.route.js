import express from "express";
import {
  handleLogin,
  handleRegisterAdmin,
  handleVerifyToken,
  handleLogout,
} from "../controllers/auth.controller.js";
import { authRateLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = express.Router();

router.post("/sign-up", authRateLimiter, handleRegisterAdmin);
router.post("/sign-in", authRateLimiter, handleLogin);
router.post("/logout", handleLogout);
router.get("/verify", handleVerifyToken);

export default router;
