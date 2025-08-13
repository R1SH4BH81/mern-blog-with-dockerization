const Blog = require("../models/blog.model");

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new Blog({ title, content, author: req.user.id });
    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getLatestBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(6);
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getAuthorBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit" });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.image = req.body.image || blog.image;

    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this blog" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getLatestBlog,
  getAuthorBlogs,
  updateBlog,
  deleteBlog,
};
