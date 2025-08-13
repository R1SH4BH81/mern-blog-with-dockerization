const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getLatestBlog,
  getAuthorBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controllers.js");

const protect = require("../middlewares/authmiddleware.js");

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/latest", getLatestBlog);

// Protected routes
router.post("/", protect, createBlog);
router.get("/dashboard", protect, getAuthorBlogs);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
