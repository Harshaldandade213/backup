import mongoose, { Schema } from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    category: {
      type: String,
      enum: [
        "SCIENCE",
        "MATHEMATICS",
        "LANGUAGE",
        "SOCIAL_STUDIES",
        "ARTS",
        "PHYSICAL_EDUCATION",
        "COMPUTER_SCIENCE",
        "OTHER",
      ],
      default: "OTHER",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index to ensure unique subject code per organization
subjectSchema.index({ organization: 1, code: 1 }, { unique: true });

export default mongoose.model("Subject", subjectSchema);
