import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BedDouble,
  Tag,
  BarChart3,
  MessageSquare,
  FileText,
  Settings,
  Hotel,
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/" },
    // { icon: BedDouble, label: "Rooms", path: "/admin/rooms" },
    { icon: Hotel, label: "Hotels", path: "/admin/hotels" }, // Changed icon to Hotel
    { icon: Tag, label: "Offers", path: "/admin/offers" },
    // { icon: BarChart3, label: "Analytics", path: "/admin/analytics" }, // Uncommented
    { icon: MessageSquare, label: "Corporate Bookings", path: "/admin/corporate" }, // Unique path
    { icon: MessageSquare, label: "Franchise", path: "/admin/franchise" }, // Unique path
    { icon: MessageSquare, label: "Queries", path: "/admin/queries" },
    { icon: FileText, label: "Blogs", path: "/admin/blogs" }, // Added Blogs
    { icon: FileText, label: "Jobs", path: "/admin/jobs" }, // Added Blogs
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-6 shadow-lg fixed top-0 left-0">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white">Hotel Admin</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin/"} // Ensures exact match for Dashboard
            className={({ isActive }) =>
              `flex items-center space-x-4 p-3 rounded-lg transition duration-300 ease-in-out ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <item.icon size={22} className="min-w-[22px]" />
            <span className="text-lg">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;