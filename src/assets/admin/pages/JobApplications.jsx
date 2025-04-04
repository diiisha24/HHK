// src/assets/admin/pages/JobApplications.jsx
import React, { useState, useEffect } from "react";
import { Download, Eye } from "react-feather";

const JobApplications = ({ heading }) => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    // Fetch job applications from your API here
    const sampleApplications = [
      {
        id: 1,
        jobTitle: "Front Desk Manager",
        applicantName: "John Doe",
        email: "john@example.com",
        phone: "+1 555-0123",
        date: "2025-03-20",
        status: "Pending",
        resumeUrl: "#",
        coverLetter: "Lorem ipsum dolor sit amet..."
      },
      {
        id: 2,
        jobTitle: "Executive Chef",
        applicantName: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 555-0124",
        date: "2025-03-21",
        status: "Reviewed",
        resumeUrl: "#",
        coverLetter: "Experienced chef with 10+ years..."
      },
    ];
    setApplications(sampleApplications);
  }, []);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{heading}</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 whitespace-nowrap">{app.jobTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.applicantName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    app.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => handleViewDetails(app)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Eye size={16} />
                  </button>
                  <a href={app.resumeUrl} className="text-green-600 hover:text-green-900">
                    <Download size={16} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Application Details</h2>
            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-700">Job Title:</span> {selectedApplication.jobTitle}
              </div>
              <div>
                <span className="font-medium text-gray-700">Applicant:</span> {selectedApplication.applicantName}
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span> {selectedApplication.email}
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span> {selectedApplication.phone}
              </div>
              <div>
                <span className="font-medium text-gray-700">Date:</span> {selectedApplication.date}
              </div>
              <div>
                <span className="font-medium text-gray-700">Cover Letter:</span>
                <p className="mt-1 text-gray-600">{selectedApplication.coverLetter}</p>
              </div>
              <div>
                <a 
                  href={selectedApplication.resumeUrl} 
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Download className="mr-2" size={16} /> Download Resume
                </a>
              </div>
            </div>
            <button 
              onClick={() => setSelectedApplication(null)}
              className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplications;