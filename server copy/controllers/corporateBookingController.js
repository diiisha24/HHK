import CorporateBooking from "../models/corporateBooking.js";
import { validationResult } from "express-validator";

// Create a new corporate booking request
const createCorporateBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const bookingData = {
      type: "corporate_booking",
      companyName: req.body.companyName,
      contactPerson: req.body.contactPerson,
      email: req.body.email,
      phone: req.body.phone,
      bookingDetails: req.body.bookingDetails,
      status: req.body.status || "pending",
    };

    const newBooking = new CorporateBooking(bookingData);
    const savedBooking = await newBooking.save({ validateBeforeSave: true });

    res.status(201).json({
      success: true,
      message: "Corporate booking request submitted successfully",
      data: {
        id: savedBooking._id,
        companyName: savedBooking.companyName,
        contactPerson: savedBooking.contactPerson,
        email: savedBooking.email,
        phone: savedBooking.phone,
        status: savedBooking.status,
        createdAt: savedBooking.createdAt,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate entry detected",
        field: Object.keys(error.keyPattern)[0],
      });
    }
    console.error("Error submitting corporate booking:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update corporate booking status
const updateCorporateBookingStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    const updatedBooking = await CorporateBooking.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: {
        id: updatedBooking._id,
        status: updatedBooking.status,
        companyName: updatedBooking.companyName,
        contactPerson: updatedBooking.contactPerson,
        email: updatedBooking.email,
        phone: updatedBooking.phone,
        updatedAt: updatedBooking.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid booking ID format" });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Fetch all corporate bookings
const getAllCorporateBookings = async (req, res) => {
  try {
    const bookings = await CorporateBooking.find()
      .select("companyName contactPerson email phone bookingDetails status createdAt updatedAt") // Added bookingDetails
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Corporate bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching corporate bookings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Fetch a single corporate booking by ID
const getCorporateBookingById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const booking = await CorporateBooking.findById(req.params.id);
    console.log(booking);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid booking ID format" });
    }
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete a corporate booking by ID
const deleteCorporateBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const deletedBooking = await CorporateBooking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: { id: deletedBooking._id },
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid booking ID format" });
    }
    res.status(500).json({
      success: false,
      message: "Error deleting booking",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export {
  createCorporateBooking,
  updateCorporateBookingStatus,
  getAllCorporateBookings,
  getCorporateBookingById,
  deleteCorporateBooking
};