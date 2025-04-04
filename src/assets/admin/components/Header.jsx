import React, { useEffect, useState } from 'react';
import { Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");

  const handleLogout = async () => {
    try {
      // Make API call to logout endpoint
      await fetch("http://localhost:5000/api/admin/logout", {
        method: "POST",
        credentials: "include", // Include cookies if using cookie-based auth
      });
      
      // Clear localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still navigate even if server call fails, since we're clearing client-side auth
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setAdminEmail(email || "Admin");
  }, []); // Empty dependency array since we only want this on mount

  return (
    <header className="bg-white shadow-lg h-16 flex items-center justify-between px-6 p-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome back, Admin</h2>
      </div>
      <div className="flex items-center space-x-6">
        <button className="p-3 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out relative">
          <Bell size={22} className="text-gray-700" />
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <User size={24} className="text-gray-700" />
          </div>
          <span className="text-lg font-medium text-gray-800">{adminEmail}</span>
        </div>
        <button 
          className="bg-white text-red-600 px-4 py-2 rounded hover:bg-red-50 transition duration-300 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;