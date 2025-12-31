import mongoose, { Schema } from "mongoose";

const classSchema = new mongoose.Schema(
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
    },
    section: {
      type: String,
      required: true,
      enum: ["A", "B", "C", "D", "E"],
    },
    classTeacher: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    tuitionFee: {
      type: Number,
      default: 0,
    },
    capacity: {
      type: Number,
      default: 40,
    },
    academicYear: {
      type: String,
      required: true,
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

// Create compound index to ensure unique class-section combination per organization
classSchema.index({ organization: 1, name: 1, section: 1 }, { unique: true });

export default mongoose.model("Class", classSchema);
