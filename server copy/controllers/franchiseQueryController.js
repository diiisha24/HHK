import FranchiseQuery from "../models/franchiseQuery.js";
import { validationResult } from "express-validator";
import fs from "fs/promises";
import path from "path";

// Create a new franchise query
const createFranchiseQuery = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) await fs.unlink(req.file.path); // Clean up uploaded file on validation failure
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const queryData = {
      type: "franchise",
      full_name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      businessExperience: req.body.businessExperience || undefined,
      investmentCapacity: req.body.investmentCapacity || undefined,
      preferredLocation: req.body.preferredLocation || undefined,
      message: req.body.message || undefined,
      businessProposal: req.file ? req.file.path : undefined,
      termsAgreed: req.body.termsAgreed === "true",
      status: req.body.status || "pending",
    };

    const newQuery = new FranchiseQuery(queryData);
    const savedQuery = await newQuery.save({ validateBeforeSave: true });

    res.status(201).json({
      success: true,
      message: "Franchise inquiry submitted successfully",
      data: {
        id: savedQuery._id,
        full_name: savedQuery.full_name,
        email: savedQuery.email,
        phone: savedQuery.phone,
        businessExperience: savedQuery.businessExperience,
        investmentCapacity: savedQuery.investmentCapacity,
        preferredLocation: savedQuery.preferredLocation,
        message: savedQuery.message,
        businessProposal: savedQuery.businessProposal,
        status: savedQuery.status,
        createdAt: savedQuery.createdAt,
      },
    });
  } catch (error) {
    if (req.file) await fs.unlink(req.file.path); // Clean up on error
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
    console.error("Error submitting franchise query:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update franchise query status
const updateFranchiseQueryStatus = async (req, res) => {
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

    const updatedQuery = await FranchiseQuery.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedQuery) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }

    res.status(200).json({
      success: true,
      message: "Query status updated successfully",
      data: {
        id: updatedQuery._id,
        status: updatedQuery.status,
        full_name: updatedQuery.full_name,
        email: updatedQuery.email,
        phone: updatedQuery.phone,
        businessExperience: updatedQuery.businessExperience,
        investmentCapacity: updatedQuery.investmentCapacity,
        preferredLocation: updatedQuery.preferredLocation,
        message: updatedQuery.message,
        businessProposal: updatedQuery.businessProposal,
        updatedAt: updatedQuery.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating query status:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid query ID format" });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Fetch all franchise queries
const getAllFranchiseQueries = async (req, res) => {
  try {
    const queries = await FranchiseQuery.find()
      .select("full_name email phone businessExperience investmentCapacity preferredLocation message businessProposal status createdAt updatedAt")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Franchise queries fetched successfully",
      data: queries,
    });
  } catch (error) {
    console.error("Error fetching franchise queries:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching queries",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Fetch a single franchise query by ID
const getFranchiseQueryById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const query = await FranchiseQuery.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }
    res.status(200).json({
      success: true,
      message: "Query fetched successfully",
      data: query,
    });
  } catch (error) {
    console.error("Error fetching query:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid query ID format" });
    }
    res.status(500).json({
      success: false,
      message: "Error fetching query",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete a franchise query by ID
const deleteFranchiseQuery = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const deletedQuery = await FranchiseQuery.findByIdAndDelete(req.params.id);
    if (!deletedQuery) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }
    if (deletedQuery.businessProposal) {
      await fs.unlink(deletedQuery.businessProposal); // Clean up file
    }
    res.status(200).json({
      success: true,
      message: "Query deleted successfully",
      data: { id: deletedQuery._id },
    });
  } catch (error) {
    console.error("Error deleting query:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid query ID format" });
    }
    res.status(500).json({
      success: false,
      message: "Error deleting query",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export {
  createFranchiseQuery,
  updateFranchiseQueryStatus,
  getAllFranchiseQueries,
  getFranchiseQueryById,
  deleteFranchiseQuery
};