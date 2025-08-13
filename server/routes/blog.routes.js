import express from "express";
import {
  createBlog,
  getAllBlogs,
  getLatestBlogs,
  getAuthorBlogs,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controllers.js";

import { protect } from "../middlewares/authmiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/latest", getLatestBlogs);

// Protected routes
router.post("/", protect, createBlog);
router.get("/dashboard", protect, getAuthorBlogs);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
