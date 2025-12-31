import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./configs/db.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

// Import routes
import authRoutes from "./routes/auth.route.js";
import organizationRoutes from "./routes/organization.route.js";
import profileRoutes from "./routes/profile.route.js";
import studentRoutes from "./routes/student.route.js";
import categoryRoutes from "./routes/category.route.js";
import employeeRoutes from "./routes/employee.route.js";
import classRoutes from "./routes/class.route.js";
import subjectRoutes from "./routes/subject.route.js";
import feeRoutes from "./routes/fee.route.js";
import salaryRoutes from "./routes/salary.route.js";
import attendanceRoutes from "./routes/attendance.route.js";

// Import middleware
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { rateLimiter } from "./middlewares/rateLimiter.middleware.js";

const app = express();

// Load environment variables
config({
  path: "./.env",
});

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Body parsing middleware
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting (apply to all routes)
app.use("/api/", rateLimiter);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "KinderNet API is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/organizations", organizationRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/classes", classRoutes);
app.use("/api/v1/subjects", subjectRoutes);
app.use("/api/v1/fees", feeRoutes);
app.use("/api/v1/salaries", salaryRoutes);
app.use("/api/v1/attendance", attendanceRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use(errorHandler);

// Initialize application
const initApp = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 KinderNet API is live on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV}`);
      console.log(`🌐 Client URL: ${process.env.CLIENT_URL}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

initApp();

export default app;
