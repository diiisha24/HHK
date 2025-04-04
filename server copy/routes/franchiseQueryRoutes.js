import express from "express";
import {
  createFranchiseQuery,
  updateFranchiseQueryStatus,
  getAllFranchiseQueries,
  getFranchiseQueryById,
  deleteFranchiseQuery
} from "../controllers/franchiseQueryController.js";
import { param, body } from "express-validator";
import protect from "../middleware/authMiddleware.js"; // Assuming this exists
import multer from "multer";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/franchise-proposals/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(file.originalname.toLowerCase().split('.').pop());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const router = express.Router();

// POST - Create a new franchise query with file upload
router.post(
  "/",
  upload.single("businessProposal"), // Handle single file upload
  [
    body("name").trim().notEmpty().withMessage("Full name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("businessExperience")
      .optional()
      .isNumeric()
      .withMessage("Business experience must be a number"),
    body("investmentCapacity")
      .optional()
      .isIn(["$100,000 - $250,000", "$250,000 - $500,000", "$500,000 - $1,000,000", "$1,000,000+"])
      .withMessage("Invalid investment capacity"),
    body("preferredLocation").optional().trim(),
    body("message").optional().trim(),
    body("termsAgreed")
      .isBoolean()
      .equals("true")
      .withMessage("You must agree to the terms and conditions"),
    body("status")
      .optional()
      .isIn(["pending", "in_progress", "resolved", "rejected"])
      .withMessage("Invalid status value"),
  ],
  createFranchiseQuery
);

// PATCH - Update franchise query status (protected)
router.patch(
  "/:id/status",
  protect,
  [
    param("id").isMongoId().withMessage("Invalid query ID"),
    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isIn(["pending", "in_progress", "resolved", "rejected"])
      .withMessage("Invalid status value"),
  ],
  updateFranchiseQueryStatus
);

// GET - Fetch all franchise queries (protected)
router.get("/", protect, getAllFranchiseQueries);

// GET - Fetch a single franchise query by ID (protected)
router.get(
  "/:id",
  protect,
  [param("id").isMongoId().withMessage("Invalid query ID")],
  getFranchiseQueryById
);

// DELETE - Delete a franchise query by ID (protected)
router.delete(
  "/:id",
  protect,
  [param("id").isMongoId().withMessage("Invalid query ID")],
  deleteFranchiseQuery
);

export default router;