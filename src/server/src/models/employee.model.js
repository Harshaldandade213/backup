import mongoose, { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"] },

    role: {
      type: String,
      enum: [
        "PRINCIPAL",
        "VICE_PRINCIPAL",
        "TEACHER",
        "LIBRARIAN",
        "LAB_ASSISTANT",
        "COUNSELOR",
        "ADMIN",
        "ACCOUNTANT",
        "CLERK",
        "RECEPTIONIST",
        "PEON",
        "SECURITY",
        "TRANSPORT",
        "HOSTEL_WARDEN",
        "IT_STAFF",
        "OTHER",
      ],
      required: true,
    },
    department: {
      type: String,
      enum: [
        "SCIENCE",
        "MATH",
        "ENGLISH",
        "HISTORY",
        "GEOGRAPHY",
        "COMPUTER_SCIENCE",
        "PHYSICAL_EDUCATION",
        "ARTS",
        "MUSIC",
        "LIBRARY",
        "ADMINISTRATION",
        "ACCOUNTING",
        "TRANSPORT",
        "IT_SUPPORT",
        "OTHER",
      ],
    },
    joiningDate: { type: Date, default: Date.now },
    employeeId: { type: String, unique: true },

    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String, default: "INDIA" },
      zipCode: { type: String },
    },

    bank: {
      accountHolderName: { type: String },
      accountNumber: { type: String },
      ifscCode: { type: String },
      bankName: { type: String },
    },

    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Employee", employeeSchema);
