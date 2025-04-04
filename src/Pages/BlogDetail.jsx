import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        setBlog(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-600">{error}</div>;
  }

  if (!blog) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Blog Not Found</h1>
        <Link to="/blog" className="text-amber-600 hover:underline mt-4 inline-block">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Link to="/blog" className="text-amber-600 hover:underline mb-6 inline-block">
          ← Back to Blog
        </Link>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-lg shadow-md mb-8"
        />
        <h1 className="text-4xl font-bold text-amber-900 mb-4">{blog.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>{new Date(blog.updatedAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>By Highway King Admin</span>
          <span className="mx-2">•</span>
          <span className="text-amber-600">{blog.category}</span>
        </div>
        <p className="text-gray-700 leading-relaxed">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;