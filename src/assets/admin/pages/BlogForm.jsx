import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Should work with Vite, but see notes below

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    image: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch blog");
          }
          const data = await response.json();
          setFormData({
            title: data.title || "",
            category: data.category || "",
            excerpt: data.excerpt || "",
            image: data.image || "",
            content: data.content || "",
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `http://localhost:5000/api/blogs/${id}`
        : "http://localhost:5000/api/blogs";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || (id ? "Failed to update blog" : "Failed to create blog")
        );
      }

      setSuccess(id ? "Blog updated successfully!" : "Blog created successfully!");
      setTimeout(() => {
        navigate("/admin/blogs", {
          state: { success: id ? "Blog updated successfully" : "Blog saved successfully" },
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    } finally {
      if (!success) setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["clean"],
    ],
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">
          {id ? "Edit Blog" : "Add New Blog"}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
            {success}
          </div>
        )}

        {loading && !id && !success && (
          <div className="text-center mb-4">Loading...</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-md font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-md font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
              required
              disabled={loading}
            >
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-md font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-md font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              id="image"
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-md font-medium text-gray-700 mb-2">
              Content
            </label>
            <ReactQuill
              value={formData.content}
              onChange={handleContentChange}
              modules={quillModules}
              className="bg-white"
              readOnly={loading}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className={`flex-1 bg-amber-600 text-white py-4 px-6 rounded-lg font-semibold transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-700"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : id ? "Update Blog" : "Add Blog"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/blogs")}
              className="flex-1 bg-gray-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;