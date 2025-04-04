import express from "express";
import { loginAdmin, getAdminProfile, logoutAdmin, registerAdmin, updateAdminProfile } from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/login", loginAdmin);
router.post("/register", registerAdmin); // Note: Consider protecting this in production
router.post("/logout", logoutAdmin);

// Protected routes
router.get("/profile", protect, getAdminProfile);
router.put("/update-profile", protect, updateAdminProfile); // Changed to PUT for REST convention

export default router;