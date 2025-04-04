import express from "express";
import {
  createCorporateBooking,
  updateCorporateBookingStatus,
  getAllCorporateBookings,
  getCorporateBookingById,
  deleteCorporateBooking
} from "../controllers/corporateBookingController.js";
import { param, body } from "express-validator";
import protect from "../middleware/authMiddleware.js"; // Assuming you have this from admin setup

const router = express.Router();

// POST - Create a new corporate booking request
router.post(
  "/",
  [
    body("companyName").trim().notEmpty().withMessage("Company name is required"),
    body("contactPerson").trim().notEmpty().withMessage("Contact person is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("bookingDetails").trim().isLength({ min: 10 }).withMessage("Booking details must be at least 10 characters"),
    body("status")
      .optional()
      .isIn(["pending", "in_progress", "resolved", "rejected"])
      .withMessage("Invalid status value (pending/in_progress/resolved/rejected)"),
  ],
  createCorporateBooking
);

// PATCH - Update corporate booking status (protected)
router.patch(
  "/:id/status",
  protect,
  [
    param("id").isMongoId().withMessage("Invalid booking ID"),
    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isIn(["pending", "in_progress", "resolved", "rejected"])
      .withMessage("Invalid status value"),
  ],
  updateCorporateBookingStatus
);

// GET - Fetch all corporate bookings (protected)
router.get("/", protect, getAllCorporateBookings);

// GET - Fetch a single corporate booking by ID (protected)
router.get(
  "/:id",
  protect,
  [param("id").isMongoId().withMessage("Invalid booking ID")],
  getCorporateBookingById
);

// DELETE - Delete a corporate booking by ID (protected)
router.delete(
  "/:id",
  protect,
  [param("id").isMongoId().withMessage("Invalid booking ID")],
  deleteCorporateBooking
);

export default router;