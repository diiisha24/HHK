// src/Component/HotelsSection.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import jaipurImage from "../images/jaipur1.jpg";
import shahpuraImage from "../images/shahpura1.jpg";
import bagruImage from "../images/bagru.jpg";
import behrorImage from "../images/behror.jpg";
import neelkaImage from "../images/neelka.jpg";
import neemranaImage from "../images/neemrana.jpg";
import bilaspurImage from "../images/bilaspur.jpg";
import axios from "axios";
// const imgs = [
//   { name: "JAIPUR", image: jaipurImage, path: "/home/jaipurroute" },
//   { name: "SHAHPURA", image: shahpuraImage, path: "/home/shahpuraroute" },
//   { name: "BAGRU", image: bagruImage, path: "/home/bagruroute" },
//   { name: "BEHROR", image: behrorImage, path: "/home/behrorroute" },
//   { name: "NEELKA", image: neelkaImage, path: "home/neelkaroute" },
//   { name: "NEEMRANA", image: neemranaImage, path: "home/neemranaroute" },
//   { name: "BILASPUR", image: bilaspurImage, path: "home/bilaspurroute"},
// ];
const Imgs ={
  'jaipur':jaipurImage,
  'shahpura':shahpuraImage,
  'bagru':bagruImage,
  'behror':behrorImage,
  'neelka':neelkaImage,
  'neemrana':neemranaImage,
  'bilaspur':bilaspurImage,
}


const HotelsSection = () => {
  const [showMore, setShowMore] = useState(false);
  const [hotels, setHotels] = useState([]);
  
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hotels");
        setHotels(response.data);
      } catch (err) {
        console.error("Failed to fetch Hotels", err);
      }
    };
    fetchHotels();
  }, []);

  const visibleHotels = showMore ? hotels : hotels.slice(0, 6);

  return (
    <section className="py-4 pb-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-amber-600">Our Properties</h2>
        
      </div>

      <div className="container mx-auto grid md:grid-cols-3 gap-6 px-6">
        {visibleHotels.map((hotel, index) => (
          <Link to={hotel.link} key={index}>
            <div className="relative overflow-hidden rounded-lg transition-transform duration-300 ease-in-out cursor-pointer">
              <img
                src={Imgs[hotel.title.toLowerCase()]}
                alt={hotel.title}
                className="w-full h-64 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-2"
              />
              <div className="absolute top-3 right-3 bg-white text-amber-900 px-3 py-1 font-bold rounded shadow">
                {hotel.title}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hotels.length > 6 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default HotelsSection;
