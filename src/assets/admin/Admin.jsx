// src/assets/admin/Admin.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Offers from "./pages/Offers";
import EditOffer from "./pages/EditOffer";
import OfferForm from "./pages/OfferForm";
import Analytics from "./pages/Analytics";
import Queries from "./pages/Queries";
import Blogs from "./pages/Blogs";
import BlogForm from "./pages/BlogForm";
import Settings from "./pages/Settings";
import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs"; // New import
import JobApplications from "./pages/JobApplications"; // New import
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const isAuthenticated = !!localStorage.getItem("authToken");
  console.log("ProtectedRoute check - isAuthenticated:", isAuthenticated, token);
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function AdminPanel() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";
  const isAuthenticated = !!localStorage.getItem("authToken");

  useEffect(() => {
    console.log("Current path:", location.pathname);
    console.log("Is login page:", isLoginPage);
    console.log("Is authenticated:", isAuthenticated);
  }, [location.pathname, isLoginPage, isAuthenticated]);

  return (
    <div className="flex min-h-screen max-h-screen overflow-hidden bg-gray-100">
      {!isLoginPage && isAuthenticated && (
        <ProtectedRoute>
          <div className="w-64 flex-shrink-0">
            <Sidebar />
          </div>
        </ProtectedRoute>
      )}
      
      <div className="flex-1 flex flex-col">
        {!isLoginPage && isAuthenticated && (
          <ProtectedRoute>
            <Header />
          </ProtectedRoute>
        )}
        
        <main className={`flex-1 ${!isLoginPage && isAuthenticated ? "p-6 overflow-scroll" : ""}`}>
          <Routes>
            {/* Existing routes */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
            <Route path="/hotels" element={<ProtectedRoute><Hotels /></ProtectedRoute>} />
            <Route path="/offers" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
            <Route path="/add-offer" element={<ProtectedRoute><OfferForm /></ProtectedRoute>} />
            <Route path="/edit-offer/:id" element={<ProtectedRoute><EditOffer /></ProtectedRoute>} />
            {/* <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} /> */}
            <Route path="/queries" element={<ProtectedRoute><Queries heading="Customer Queries"/></ProtectedRoute>} />
            <Route path="/franchise" element={<ProtectedRoute><Queries heading="Franchise Related Queries" queryType="franchise"/></ProtectedRoute>} />
            <Route path="/corporate" element={<ProtectedRoute><Queries heading="Corporate Booking Queries" queryType="corporate_booking"/></ProtectedRoute>} />
            <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
            <Route path="/blogs/add" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} />
            <Route path="/blogs/edit/:id" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            
            {/* New routes */}
            <Route 
              path="/jobs" 
              element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/job-applications" 
              element={
                <ProtectedRoute>
                  <JobApplications heading="Job Applications" />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
          </Routes>
        </main>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-white p-2 rounded shadow text-sm">
          Auth: {isAuthenticated ? "Yes" : "No"} | Path: {location.pathname}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;