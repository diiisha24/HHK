import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const HotelHighwayKingCareers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/jobs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        
        const data = await response.json();
        setJobs(data.jobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Effect to handle body overflow when modal is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedJob]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.department?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || job.jobType === filterType;
    return matchesSearch && matchesType && job.isActive;
  });

  const handleApply = (job) => {
    setSelectedJob(job);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', selectedJob._id);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('resume', formData.resume);
      formDataToSend.append('coverLetter', formData.coverLetter);

      const response = await fetch('http://localhost:5000/api/job-applications', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setSelectedJob(null);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading jobs...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-amber-400 to-amber-600 text-white py-24 px-28">
        <div className="max-w-6xl">
          <h1 className="text-4xl font-bold mb-2">Careers at Hotel Highway King</h1>
          <p className="text-xl   text-xl opacity-90">Join our team and be part of an extraordinary hospitality experience</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for jobs by title, department, or location"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-1 focus:ring-amber-300 focus:border-amber-300 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border rounded-md focus:ring-1 focus:ring-amber-300 focus:border-amber-300"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Positions</h2>
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-lg text-gray-600">No jobs match your search criteria. Please try a different search.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-t-4 border-yellow-400">
                <div className="p-6 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-amber-900">{job.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${job.jobType === 'Full-time' ? 'bg-amber-100 text-amber-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {job.jobType}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-700 w-20">Location:</span>
                      <span className="text-gray-600">{job.location}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-700 w-28">Department:</span>
                      <span className="text-gray-600">{job.department || 'N/A'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 w-24">Experience:</span>
                      <span className="text-gray-600">{job.experience || 'Not specified'}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6">{job.description}</p>
                  <button 
                    onClick={() => handleApply(job)}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 shadow-md cursor-pointer w-fit"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-[#00000070] flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Apply for {selectedJob.title}</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full p-2 border rounded-md focus:ring-amber-300 focus:border-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full p-2 border rounded-md focus:ring-amber-300 focus:border-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full p-2 border rounded-md focus:ring-amber-300 focus:border-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resume</label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleInputChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="mt-1 w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows="4"
                    className="mt-1 w-full p-2 border rounded-md focus:ring-amber-300 focus:border-amber-300"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-500"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelHighwayKingCareers;