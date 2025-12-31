import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    class: {
      type: String,
      enum: [
        "Nursery",
        "KG-1",
        "KG-2",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
    dateOfBirth: {
      type: Date,
    },

    section: {
      type: String,
      enum: ["A", "B", "C", "D", "E"],
      default: "A",
    },
    rollNumber: {
      type: Number,
    },
    studentId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
    },
    guardianName: {
      type: String,
    },
    guardianContact: {
      type: String,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
