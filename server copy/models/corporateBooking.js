import mongoose from "mongoose";

const corporateBookingSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "corporate_booking",
    enum: ["corporate_booking"], // Restrict to corporate_booking only
  },
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bookingDetails: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in_progress", "resolved", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model("CorporateBooking", corporateBookingSchema);