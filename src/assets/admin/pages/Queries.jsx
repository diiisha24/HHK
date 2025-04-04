import React, { useState, useEffect } from 'react';
import { MessageSquare, CheckCircle, XCircle } from 'lucide-react';

const Queries = ({ heading, queryType }) => {
  const [queries, setQueries] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine API endpoint based on queryType
  const getApiEndpoint = () => {
    switch (queryType) {
      case 'franchise':
        return 'http://localhost:5000/api/franchise-queries';
      case 'corporate_booking':
        return 'http://localhost:5000/api/corporate-bookings';
      default:
        throw new Error('Invalid query type');
    }
  };

  // Fetch queries from the appropriate API
  const fetchQueries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = getApiEndpoint();
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (!response.ok) throw new Error(`Failed to fetch ${queryType} queries`);
      const json = await response.json();
      if (json.success) {
        setQueries(json.data);
      } else {
        throw new Error(json.message || 'Error fetching queries');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, [queryType]);

  // Handle status update
  const updateQueryStatus = async (id, newStatus) => {
    try {
      const endpoint = `${getApiEndpoint()}/${id}/status`;
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      const json = await response.json();
      if (json.success) {
        setQueries(prevQueries =>
          prevQueries.map(query =>
            query._id === id ? { ...query, status: newStatus } : query
          )
        );
      } else {
        throw new Error(json.message || 'Error updating status');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredQueries = queries.filter(query => query.status === activeTab);

  if (isLoading) {
    return <div className="text-center">Loading queries...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{heading}</h2>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'pending'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab('resolved')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'resolved'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Resolved
        </button>
      </div>

      <div className="space-y-4">
        {filteredQueries.length === 0 ? (
          <p className="text-gray-500">No {activeTab} queries found.</p>
        ) : (
          filteredQueries.map((query) => (
            <div key={query._id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {queryType === 'corporate_booking' ? 'Corporate Booking Inquiry' : 'Franchise Inquiry'}
                  </h3>
                  <ul className="text-sm text-gray-500 space-y-1 mt-2">
                    <li>
                      <strong>From:</strong>{' '}
                      {queryType === 'corporate_booking'
                        ? `${query.contactPerson} (${query.email}) - ${query.companyName}`
                        : `${query.full_name} (${query.email})`}
                    </li>
                    <li>
                      <strong>{queryType === 'corporate_booking' ? 'Booking Details' : 'Message'}:</strong>{' '}
                      {queryType === 'corporate_booking' ? query.bookingDetails : query.message}
                    </li>
                    <li>
                      <strong>Date:</strong> {new Date(query.createdAt).toLocaleDateString()}
                    </li>
                    {queryType === 'corporate_booking' && (
                      <li>
                        <strong>Phone:</strong> {query.phone}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MessageSquare size={16} />
                  <span>Query ID: {query._id}</span>
                </div>
                <div className="flex space-x-2">
                  {query.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateQueryStatus(query._id, 'resolved')}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <CheckCircle size={16} />
                        <span>Mark as Resolved</span>
                      </button>
                      <button
                        onClick={() => updateQueryStatus(query._id, 'rejected')}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <XCircle size={16} />
                        <span>Dismiss</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Queries;