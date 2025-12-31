import mongoose, { Schema } from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    month: {
      type: String,
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
    feeType: {
      type: String,
      enum: [
        "TUITION",
        "ADMISSION",
        "EXAMINATION",
        "TRANSPORT",
        "LIBRARY",
        "SPORTS",
        "ANNUAL",
        "OTHER",
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    amountPaid: {
      type: Number,
      default: 0,
      min: 0,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paidDate: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      enum: ["CASH", "CARD", "UPI", "BANK_TRANSFER", "CHEQUE", "OTHER"],
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PENDING", "PARTIAL", "PAID", "OVERDUE"],
      default: "PENDING",
    },
    remarks: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Auto-update status based on payment
feeSchema.pre("save", function (next) {
  if (this.amountPaid === 0) {
    this.status = "PENDING";
  } else if (this.amountPaid < this.amount) {
    this.status = "PARTIAL";
  } else if (this.amountPaid >= this.amount) {
    this.status = "PAID";
  }

  // Check if overdue
  if (this.status !== "PAID" && new Date() > this.dueDate) {
    this.status = "OVERDUE";
  }

  next();
});

export default mongoose.model("Fee", feeSchema);
