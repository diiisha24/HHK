import React, { useState, useEffect } from 'react'; // Add useEffect
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './BookingEngine.css';

const BookingEngine = ({ type, propertyCode }) => { // Add propertyCode as a prop
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(moment().add(1, 'days').toDate());
  const [property, setProperty] = useState(propertyCode || ''); // Use propertyCode as initial value
  const [errors, setErrors] = useState({});

  const properties = [
    { value: 'XIRX0513', label: 'Hotel Highway King Bagru' },
    { value: 'XIRV0513', label: 'Hotel Highway King Bheror' },
    { value: 'XIRT0513', label: 'Hotel Highway King Jaipur' },
    { value: 'XIRR0513', label: 'Hotel Highway King Shahpura' },
    { value: 'VAEI0303', label: 'Hotel Highway King Bilaspur' },
  ];

  // Set property when propertyCode changes
  useEffect(() => {
    if (propertyCode) {
      setProperty(propertyCode);
    }
  }, [propertyCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!property) newErrors.property = 'Please select a property';
    if (!checkInDate) newErrors.checkIn = 'Please select check-in date';
    if (!checkOutDate) newErrors.checkOut = 'Please select check-out date';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      e.target.submit();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form
        name="resBooking"
        action="https://bookings.resavenue.com/resBooking4/searchRooms"
        method="get"
        target="_blank"
        onSubmit={handleSubmit}
        className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20"
        id="booking-container"
      >
        <input type="hidden" name="targetTemplate" value="4" />
        <input type="hidden" name="curr" value="INR" />

        <div className={`gap-4 ${type ? "flex flex-col" : "grid grid-cols-1 md:grid-cols-4 "}`}>
          {/* Property Selection */}
          <div className="flex flex-col">
            <div className="relative">
              <select
                name="regCode"
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                className={`w-full py-4 px-3 bg-white/95 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-gray-700 placeholder-gray-400 ${
                  errors.property ? 'border-red-400' : ''
                }`}
              >
                <option value="">Select Property</option>
                {properties.map((prop) => (
                  <option key={prop.value} value={prop.value}>
                    {prop.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.property && (
              <span className="text-red-400 text-xs mt-1 drop-shadow-md">{errors.property}</span>
            )}
          </div>

          {/* Check-in Date */}
          <div className="flex flex-col">
            <div className="relative">
              <DatePicker
                selected={checkInDate}
                onChange={(date) => {
                  setCheckInDate(date);
                  setCheckOutDate(moment(date).add(1, 'days').toDate());
                }}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                name="arrDate"
                className={`w-full py-4 px-3 pl-10 bg-white/95 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 ${
                  errors.checkIn ? 'border-red-400' : ''
                }`}
                placeholderText="Check-in (DD/MM/YYYY)"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            {errors.checkIn && (
              <span className="text-red-400 text-xs mt-1 drop-shadow-md">{errors.checkIn}</span>
            )}
          </div>

          {/* Check-out Date */}
          <div className="flex flex-col">
            <div className="relative">
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                minDate={moment(checkInDate).add(1, 'days').toDate()}
                dateFormat="dd/MM/yyyy"
                name="depDate"
                className={`w-full py-4 px-3 pl-10 bg-white/95 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 ${
                  errors.checkOut ? 'border-red-400' : ''
                }`}
                placeholderText="Check-out (DD/MM/YYYY)"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            {errors.checkOut && (
              <span className="text-red-400 text-xs mt-1 drop-shadow-md">{errors.checkOut}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-4 px-6 rounded-xl shadow-md hover:bg-amber-500 cursor-pointer focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center"
            >
              <span>Book Now</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingEngine;