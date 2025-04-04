import mongoose from "mongoose";

const franchiseQuerySchema = new mongoose.Schema({
  type: {
    type: String,
    default: "franchise",
    enum: ["franchise"],
  },
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  businessExperience: { type: Number, required: false },
  investmentCapacity: {
    type: String,
    enum: ["$100,000 - $250,000", "$250,000 - $500,000", "$500,000 - $1,000,000", "$1,000,000+", ""],
    required: false,
  },
  preferredLocation: { type: String, required: false },
  message: { type: String, required: false },
  businessProposal: { type: String, required: false }, // Stores file path
  termsAgreed: { type: Boolean, required: true },
  status: {
    type: String,
    enum: ["pending", "in_progress", "resolved", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model("FranchiseQuery", franchiseQuerySchema);