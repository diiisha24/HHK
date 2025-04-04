import React, { useEffect } from "react";
import BookingEngine from "../assets/bookingEngine/booking_engine";

const PropertyPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mapping of hotel titles to property codes
  const propertyCodeMap = {
    "Bagru": "XIRX0513",
    "Behror": "XIRV0513",
    "Jaipur": "XIRT0513",
    "Shahpura": "XIRR0513",
    "Bilaspur": "VAEI0303",
  };

  // Get the property code based on the hotel title
  const propertyCode = propertyCodeMap[props.hotel.title] || "";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
        <div className="relative h-96">
          <img
            src="/src/assets/images/bagru.jpg"
            alt={`Hotel Highway King ${props.hotel.title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-center items-center p-8 z-20">
            <h1 className="text-white text-4xl font-bold leading-tight text-center">
              Hotel Highway King {props.hotel.title}
            </h1>
            <p className="text-white/90 text-lg mt-2 text-center">
              {props.hotel.desc}
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2" id="about">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                About Hotel Highway King {props.hotel.title}
              </h2>
              <p className="text-gray-600 mb-6">{props.hotel.about}</p>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">
                Our Amenities
              </h3>
              <ul className="grid grid-cols-2 gap-4 mb-6">
                {props.hotel.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {amenity}
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">
                Popular Nearby Attractions
              </h3>
              <ul className="space-y-4 mb-6">
                {props.hotel.popularNearbyAttractions.map((attraction, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-2 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {attraction}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Book Your Stay
                </h3>
                <p className="text-gray-600 mb-4">
                  Best rates guaranteed when you book directly with us.
                </p>
                {/* <div className="bg-yellow-100 p-3 rounded-lg mb-4">
                  <p className="text-sm font-medium text-yellow-800">
                    Winter Sale: Get 15% off on all bookings!
                  </p>
                </div> */}
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  Starting Onwards {" "} ₹{props.hotel.price}{" "}
                  <span className="text-sm font-normal text-gray-600">
                    /night
                  </span>
                </div>
                <BookingEngine type="2" propertyCode={propertyCode} /> {/* Pass propertyCode */}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16" id="location">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📍 Our Location
            </h2>
            <p className="text-gray-600 mb-4">Find us in the heart of {props.hotel.title}</p>
          </div>
          <iframe
            src="https://www.google.com/maps?q=26.83069874380164, 75.57080317924535&hl=en&z=15&output=embed"
            width="100%"
            height="400"
            className="border-none rounded-lg"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;