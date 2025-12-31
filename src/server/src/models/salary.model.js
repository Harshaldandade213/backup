import mongoose, { Schema } from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    month: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    year: {
      type: Number,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
      min: 0,
    },
    allowances: {
      hra: { type: Number, default: 0 },
      da: { type: Number, default: 0 },
      ta: { type: Number, default: 0 },
      medical: { type: Number, default: 0 },
      other: { type: Number, default: 0 },
    },
    deductions: {
      pf: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      insurance: { type: Number, default: 0 },
      loan: { type: Number, default: 0 },
      other: { type: Number, default: 0 },
    },
    grossSalary: {
      type: Number,
      default: 0,
    },
    netSalary: {
      type: Number,
      default: 0,
    },
    workingDays: {
      type: Number,
      default: 0,
    },
    presentDays: {
      type: Number,
      default: 0,
    },
    paymentDate: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      enum: ["CASH", "BANK_TRANSFER", "CHEQUE", "UPI", "OTHER"],
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "PAID", "FAILED"],
      default: "PENDING",
    },
    remarks: {
      type: String,
    },
    generatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Auto-calculate gross and net salary
salarySchema.pre("save", function (next) {
  // Calculate total allowances
  const totalAllowances =
    (this.allowances.hra || 0) +
    (this.allowances.da || 0) +
    (this.allowances.ta || 0) +
    (this.allowances.medical || 0) +
    (this.allowances.other || 0);

  // Calculate total deductions
  const totalDeductions =
    (this.deductions.pf || 0) +
    (this.deductions.tax || 0) +
    (this.deductions.insurance || 0) +
    (this.deductions.loan || 0) +
    (this.deductions.other || 0);

  // Calculate gross salary
  this.grossSalary = this.basicSalary + totalAllowances;

  // Calculate net salary
  this.netSalary = this.grossSalary - totalDeductions;

  next();
});

// Create compound index to ensure unique salary per employee per month-year
salarySchema.index({ organization: 1, employee: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model("Salary", salarySchema);
