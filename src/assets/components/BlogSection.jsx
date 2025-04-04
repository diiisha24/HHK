import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="py-16 text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="py-16 text-center text-red-600">{error}</div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-center mb-4 text-amber-600">
            From Our Blog
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Keep always updated on the latest topics
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-amber-600 font-semibold">
                  {blog.category}
                </span>
                <h3 className="text-xl font-semibold text-gray-800 mt-2">
                  <Link
                    to={`/blog/${blog.id}`}
                    className="hover:text-amber-600 transition-colors"
                  >
                    {blog.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mt-2">{blog.excerpt}</p>
                <p className="text-sm text-gray-500 mt-4 flex justify-between">
                  {new Date(blog.updatedAt).toLocaleDateString()} 
                  <div>-By Highway King Admin</div>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-block bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-500 transition-colors"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;