import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all blogs (public)
router.get("/", getAllBlogs);

// Get a single blog by ID (public)
router.get("/:id", getBlogById);

// Create a new blog (admin only)
router.post("/", auth, createBlog);

// Update a blog (admin only)
router.put("/:id", auth, updateBlog);

// Delete a blog (admin only)
router.delete("/:id", auth, deleteBlog);

export default router;