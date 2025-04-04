import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, BedDouble, DollarSign, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Jan', bookings: 65 },
  { name: 'Feb', bookings: 59 },
  { name: 'Mar', bookings: 80 },
  { name: 'Apr', bookings: 81 },
  { name: 'May', bookings: 56 },
  { name: 'Jun', bookings: 95 },
];

const Dashboard = () => {
  // if(!localStorage.getItem("authToken")) {
  //   window.location.href = "/admin/login";
  // }
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value="1,234"
          icon={BedDouble}
          trend="+12.5%"
          color="blue"
        />
        <StatCard
          title="Revenue"
          value="$45,678"
          icon={DollarSign}
          trend="+8.2%"
          color="green"
        />
        <StatCard
          title="Customers"
          value="892"
          icon={Users}
          trend="+5.1%"
          color="purple"
        />
        <StatCard
          title="Occupancy Rate"
          value="78%"
          icon={TrendingUp}
          trend="+3.2%"
          color="orange"
        />
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Booking Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((booking) => (
              <div key={booking} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Guest {booking}</p>
                  <p className="text-sm text-gray-500">Room {100 + booking}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$299</p>
                  <p className="text-sm text-gray-500">2 nights</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((review) => (
              <div key={review} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Guest {review}</p>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Great experience! The room was clean and comfortable.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color }) => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className={`${colors[color]} p-3 rounded-lg`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
      <div className="mt-4">
        <span className="text-green-500 text-sm">{trend}</span>
        <span className="text-gray-500 text-sm"> vs last month</span>
      </div>
    </div>
  );
};

export default Dashboard;