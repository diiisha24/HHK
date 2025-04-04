import Blog from "../models/blog.js";

// Get all blogs (public)
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by createdAt instead of date
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single blog by ID (public)
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new blog (admin only)
const createBlog = async (req, res) => {
  const { title, category, excerpt, image, content } = req.body;

  const blog = new Blog({
    title,
    category,
    excerpt,
    image,
    content,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a blog (admin only)
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const { title, category, excerpt, image, content } = req.body;
    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.excerpt = excerpt || blog.excerpt;
    blog.image = image || blog.image;
    blog.content = content || blog.content;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a blog (admin only)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };