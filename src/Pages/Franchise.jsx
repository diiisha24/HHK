import React, { useState } from 'react';
// import backgroundVideo from '../assets/images/video.mp4'; // Adjust path as necessary
import { motion } from 'framer-motion';
import franchise_photo from '../assets/images/P1938063.jpg';
import corporateBookingImage from '../assets/images/corporate.jpg';
import meetingSpaceImage from '../assets/images/occassion.jpg';

const Franchise = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessExperience: '',
    investmentCapacity: '',
    preferredLocation: '',
    message: '',
    businessProposal: null,
    termsAgreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const benefits = [
    {
      title: "Dedicated Relationship Manager",
      description: "We value your business and provide a dedicated manager who will assist you throughout your booking process and stay. Our relationship managers understand your specific needs and ensure a personalized experience."
    },
    {
      title: "GST Invoicing",
      description: "Simplified and professional GST invoicing for all corporate bookings. Our invoices are compliant with tax regulations, making it easier for you to manage your expenses."
    },
    {
      title: "Bill To Company",
      description: "Seamless corporate billing process with complete transparency. We understand the importance of streamlined payment processes and make it hassle-free."
    },
    {
      title: "Early Check-In",
      description: "We know that business schedules can be demanding, and sometimes you need to check in early. We provide flexible check-in options when you arrive at an unusual hour."
    },
    {
      title: "Complimentary Breakfast",
      description: "Start your day on the right note with our complimentary breakfast. Our specially curated menu ensures a productive start to your day."
    },
    {
      title: "Airport Pickup And Drop",
      description: "To make your travel experience more convenient, we offer airport pickup and drop services with professional drivers to get you to your destination safely."
    }
  ];
  
  const faqs = [
    {
      question: "How Can I Contact My Dedicated Relationship Manager?",
      answer: "Your dedicated relationship manager will be assigned upon your first booking and will reach out to you directly. You can also contact them through our corporate support line."
    },
    {
      question: "Can I Receive GST Invoices For My Corporate Bookings?",
      answer: "Yes, we provide GST invoices for all corporate bookings. These are sent automatically after your stay is completed."
    },
    {
      question: "Is Early Check-In Available For Corporate Bookings?",
      answer: "Yes, we offer flexible check-in times for our corporate guests, subject to availability. Please inform us in advance of your arrival time."
    },
    {
      question: "Do You Provide Complimentary Breakfast For Corporate Guests?",
      answer: "Yes, all corporate bookings include complimentary breakfast at our in-house restaurant."
    },
    {
      question: "What If I Need To Cancel Or Modify My Booking?",
      answer: "We offer a flexible cancellation policy, and any modifications can be made by contacting our customer support team directly. Please review the terms on your booking confirmation."
    },
    {
      question: "Do You Offer Discounts For Long-Term Corporate Stays?",
      answer: "Yes, we provide special rates for long-term stays. Please reach out to our corporate sales team for personalized pricing and packages."
    }
  ];
  const handleFileChange = (e) => {
    setFormData({ ...formData, businessProposal: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await fetch('http://localhost:5000/api/franchise-queries', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to submit franchise inquiry');
      const json = await response.json();
      if (json.success) {
        setSuccess('Franchise inquiry submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          businessExperience: '',
          investmentCapacity: '',
          preferredLocation: '',
          message: '',
          businessProposal: null,
          termsAgreed: false,
        });
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-400 to-amber-600">
      {/* Hero Section */}
      <div className="pt-24 pb-20 px-6 sm:px-8 lg:px-12 lg:pl-28">
        <div className="mx-auto">
          <div className="flex grid-cols-1 gap-7 lg:grid-cols-2 items-center">
            <motion.div
              className="text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl font-extrabold mb-6 max-w-md">
                Request To The Own Your Hotel Highway King
              </h1>
              <p className="text-xl mb-6 max-w-lg">
                We understand the unique needs and requirements of corporate travelers. Book with us for a range of exclusive benefits and services tailored specifically for corporate stays.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-3xl mx-auto">
              <motion.img 
                src={corporateBookingImage} 
                alt="Corporate Booking" 
                className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 w-full" 
                loading="lazy"
              />
              <motion.img 
                src={meetingSpaceImage} 
                alt="Meeting Space" 
                className="rounded-lg mt-8 shadow-lg transition-transform duration-300 hover:scale-105 w-full" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      
       {/* Benefits Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.h2
            className="text-4xl font-bold text-center mb-4 text-amber-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Partner With Us
          </motion.h2>
          <p className="text-center text-gray-600 mb-12 max-w-4xl">
            Book your corporate stay with us today and experience the perfect blend of comfort, convenience, and personalized service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-2xl overflow-hidden border-t-4 border-amber-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-amber-500 flex flex-col md:flex-row items-center justify-center max-h-[900px] h-[900px]">
      {/* Left Side: Image */}
      <div className="md:w-1/2 w-full h-full">
        <img
          src={franchise_photo}
          alt="Hotel Interior"
          className="w-full h-full object-cover shadow-lg"
        />
      </div>

      {/* Right Side: Form */}
      <div className="md:w-1/2 w-full p-8 px-20 flex flex-col justify-center h-full">
        <motion.h2
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Franchise Inquiry
        </motion.h2>
        <p className="text-white/80 mb-12">
          Join our growing network and bring our vision to your community with a franchise opportunity tailored for success.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/50 focus:outline-none focus:border-white text-white placeholder-white/70 px-0 py-3 text-lg pl-4"
                placeholder="Full Name *"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/50 focus:outline-none focus:border-white text-white placeholder-white/70 px-0 py-3 text-lg pl-4"
                placeholder="Email Address *"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/50 focus:outline-none focus:border-white text-white placeholder-white/70 px-0 py-3 text-lg pl-4"
                placeholder="Phone Number *"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <input
                type="number"
                name="businessExperience"
                value={formData.businessExperience}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/50 focus:outline-none focus:border-white text-white placeholder-white/70 px-0 py-3 text-lg pl-4"
                placeholder="Business Experience (Years)"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <select
                name="investmentCapacity"
                value={formData.investmentCapacity}
                onChange={handleChange}
                className="w-full pl-4 bg-transparent border-b border-white/50 focus:outline-none focus:border-white text-white placeholder-white/70 px-0 py-3 text-lg appearance-none"
                disabled={isSubmitting}
              >
                <option value="" className="text-black">Select Investment Capacity</option>
                <option value="$100,000 - $250,000" className="text-black">$100,000 - $250,000</option>
                <option value="$250,000 - $500,000" className="text-black">$250,000 - $500,000</option>
                <option value="$500,000 - $1,000,000" className="text-black">$500,000 - $1,000,000</option>
                <option value="$1,000,000+" className="text-black">$1,000,000+</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/50 focus:outline-none focus:border-white text-white placeholder-white/70 px-0 py-3 text-lg pl-4"
                placeholder="Preferred Location"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full bg-transparent border-b border-white/50 focus:outline-none focus:border-white text-white placeholder-white/70 px-0 py-3 text-lg resize-none pl-4"
              placeholder="Why do you want to open a franchise?"
              disabled={isSubmitting}
            ></textarea>
          </div>

          <div>
            <input
              type="file"
              name="businessProposal"
              onChange={handleFileChange}
              className="w-full text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-amber-900 hover:file:bg-gray-200"
              accept=".pdf,.doc,.docx"
              disabled={isSubmitting}
            />
            <p className="text-xs text-white/70 mt-1">Accepted file types: PDF, DOC, DOCX</p>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={handleChange}
              className="h-5 w-5 text-amber-600 focus:ring-amber-500 border-white/50 rounded"
              required
              disabled={isSubmitting}
            />
            <label htmlFor="termsAgreed" className="ml-3 text-sm text-white/80">
              I agree to the terms and conditions *
            </label>
          </div>

          <button
            type="submit"
            className={`w-full bg-white text-amber-900 py-4 px-6 rounded-lg text-lg font-semibold transition-colors cursor-pointer ${
              isSubmitting || !formData.termsAgreed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
            }`}
            disabled={isSubmitting || !formData.termsAgreed}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Franchise Inquiry'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Franchise;