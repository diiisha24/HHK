import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true, // URL of the image
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
blogSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;