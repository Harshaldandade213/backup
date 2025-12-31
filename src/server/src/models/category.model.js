import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["FEE", "EXPENSE", "SUBJECT", "GENERAL"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
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

// Create compound index to ensure unique category name per type per organization
categorySchema.index({ organization: 1, name: 1, type: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);
