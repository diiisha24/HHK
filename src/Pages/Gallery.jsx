import React, { useState } from "react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
// Import images
import bagru from "../assets/images/bagru.jpg";
import bagrudining from "../assets/images/bagrudining.jpg";
import gallery3 from "../assets/images/wedding.jpg";
import swimming2 from "../assets/images/socialevent.jpg";
import gallery5 from "../assets/images/swimming2.jpg";
import gallery6 from "../assets/images/occassion.jpg";
import gallery7 from "../assets/images/birthdayceleb.jpg";
import gallery8 from "../assets/images/bilaspur1.jpg";
import TestimonialSlider from "../assets/components/TestimonialSlider";

const galleryImages = [
  { url: bagru, alt: "Hotel" },
  { url: bagrudining, alt: "Luxury Dining" },
  { url: gallery3, alt: "Restaurant" },
  { url: swimming2, alt: "Poolside" },
  { url: gallery5, alt: "Fitness Center" },
  { url: gallery6, alt: "Spa" },
  { url: gallery7, alt: "Meeting Room" },
  { url: gallery8, alt: "Garden" },
];

const testimonials = [
  { id: 1, name: "Anand Kumar", review: "Clean, reasonably priced hotel close to the airport. Staff were friendly and helpful.", role: "Business Traveler" },
  { id: 2, name: "Pinki Singh", review: "Very comfortable stay, highly recommended for solo travelers.", role: "Solo Traveler" },
  { id: 3, name: "Heena Pamecha", review: "The staff is very helpful and humble. Great for business or family trips.", role: "Business Traveler" },
  { id: 4, name: "Rajeev Kumar", review: "Excellent service, great location, and a wonderful experience.", role: "Family Traveler" },
  { id: 5, name: "Sonal Sharma", review: "Exceeded expectations! Comfortable rooms and amazing food!", role: "Leisure Traveler" },
];


const Gallery = () => {
  return (
    <section className="min-h-screen py-16 px-6">
      <div className="container mx-auto text-center pb-12">
      <h1 class="md:text-4xl text-4xl font-bold text-center mb-4 text-amber-600 bg-clip-text">GALLERY</h1>
        <p className="text-center text-gray-500 mb-6">Explore the beauty and comfort of Hotel Highway King through our curated gallery.</p>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-2xl cursor-pointer relative shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img src={image.url} alt={image.alt} className="w-full h-48 object-cover rounded-2xl" />
            </motion.div>
          ))}
        </div>
        {/* Call to Action */}
        <div className="max-w-lg mx-auto mt-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Ready to book your stay?</h2>
          <button className="text-white bg-amber-600 px-6 py-3 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">Book Now</button>
        </div>
      </div>
      
      {/* Testimonials */}
      <TestimonialSlider color="white"/>
    </section>
  );
};

export default Gallery;
