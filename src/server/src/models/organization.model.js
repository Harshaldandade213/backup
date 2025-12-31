import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: { type: String, default: "IND" },
    },
    contactEmail: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
    },
    principalName: {
      type: String,
    },
    establishedYear: {
      type: Number,
    },
    website: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

organizationSchema.pre("save", async function (next) {
  if (!this.code) {
    const random = Math.floor(1000 + Math.random() * 9000);
    const prefix = this.name?.split(" ")[0]?.toUpperCase();
    this.code = `${prefix}_${random}`;
  }
  next();
});

export default mongoose.model("Organization", organizationSchema);
