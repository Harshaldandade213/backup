import mongoose, { Schema } from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    attendanceType: {
      type: String,
      enum: ["STUDENT", "EMPLOYEE"],
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LATE", "HALF_DAY", "LEAVE"],
      required: true,
    },
    checkInTime: {
      type: String,
    },
    checkOutTime: {
      type: String,
    },
    remarks: {
      type: String,
    },
    markedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Validation: Either student or employee must be present
attendanceSchema.pre("save", function (next) {
  if (this.attendanceType === "STUDENT" && !this.student) {
    return next(new Error("Student ID is required for student attendance"));
  }
  if (this.attendanceType === "EMPLOYEE" && !this.employee) {
    return next(new Error("Employee ID is required for employee attendance"));
  }
  next();
});

// Create compound indexes
attendanceSchema.index({ organization: 1, student: 1, date: 1 });
attendanceSchema.index({ organization: 1, employee: 1, date: 1 });
attendanceSchema.index({ organization: 1, attendanceType: 1, date: 1 });

export default mongoose.model("Attendance", attendanceSchema);
