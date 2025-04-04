import React, { useState, useEffect } from "react";
import BookingEngine from "../bookingEngine/booking_engine.jsx";
import "../../styles/hero.css";

import img2 from "../images/jaipurevent.jpg";
import img1 from "../images/bagruroom.jpg";
import img3 from "../images/jaipurdining.jpg";
import img4 from "../images/bagrueventspace.jpg";
import img5 from "../images/P1938291.jpg";

export const Hero = () => {
  const images = [img1, img2, img3, img4, img5];
  const [currentImage, setCurrentImage] = useState(0);

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handler functions for buttons
  const nextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center">
      {/* Slider Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={images[currentImage]}
          alt={`Slide ${currentImage + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#00000085] bg-opacity-50"></div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        aria-label="Previous Image"
      >
        ❮
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        aria-label="Next Image"
      >
        ❯
      </button>

      {/* Content */}
      <div className="absolute bottom-[30px] z-10 container mx-auto px-4 pt-24">
        <div className="text-center text-white mb-4">
          <h1 className="text-5xl font-bold text-center mb-4 text-white">
            Rest Easy, Travel Far
          </h1>
          <p className="text-xl md:text-xl max-w-xl text-center mx-auto">
            Discover the perfect blend of luxury and comfort, where every journey finds its home at Hotel Highway King.
          </p>
        </div>
        <BookingEngine />
      </div>
    </div>
  );
};