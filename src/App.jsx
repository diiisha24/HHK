import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { ModalProvider } from "./assets/contexts/ModalContext";
import Navbar from "./assets/components/Navbar"; // Default import here
import PropertySlider from "./assets/components/PropertySlider";
import EventServices from "./assets/components/EventServices";
import TestimonialSlider from "./assets/components/TestimonialSlider";
import Footer from "./assets/components/Footer";
import HotelsSection from "./assets/components/HotelsSection";
import { Hero } from "./assets/components/Hero";
import Chatbot from "./assets/components/Chatbot";
import JaipurPage from "./assets/components/JaipurPage";
import ShahpuraPage from "./assets/components/ShahpuraPage";
import BagruPage from "./assets/components/BagruPage";
import BehrorPage from "./assets/components/BehrorPage";
import NeelkaPage from "./assets/components/NeelkaPage";
import NeemranaPage from "./assets/components/NeemranaPage";
import BilaspurPage from "./assets/components/BilaspurPage";

// import JaipurPropertyPage from "./Pages/JaipurProperty";
// import BilaspurPropertyPage from "./Pages/BilaspurProperty";
// import BagruPropertyPage from "./Pages/BagruProperty";
// import ShahpuraPropertyPage from "./Pages/ShahpuraProperty";
// import BehrorPropertyPage from "./Pages/BehrorProperty";
// import NeelkaPropertyPage from "./Pages/NeelkaProperty";
// import NeemranaPropertyPage from "./Pages/NeemranaProperty";

import About from "./Pages/About";
import Franchise from "./Pages/Franchise";
import CorporateBooking from "./Pages/CorporateBooking";
import SocialEventPage from "./Pages/SocialEventPage";
import OffersModal from "./assets/components/OffersModal";
import Room from "./Pages/Room";
import Gallery from "./Pages/Gallery";
import Career from "./Pages/Career";
import WeddingEventPage from "./Pages/WeddingEventPage";
import OccasionEventPage from "./Pages/OccasionEventPage";
import CorporateEventPage from "./Pages/CorporateEventPage";
import PropertyPage from "./Pages/PropertyPage";
import BlogSection from "./assets/components/BlogSection";
import Blog from "./Pages/Blog";
import BlogDetail from "./Pages/BlogDetail";


const Home = () => {
  return (
    <>
      <Hero />
      <PropertySlider />
      <EventServices />
      <HotelsSection />
      <BlogSection/>
      <TestimonialSlider />
    </>
  );
};

const App = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/offers");
        setOffers(response.data);
      } catch (err) {
        setError("Failed to fetch offers");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hotels");
        setHotels(response.data);
        // console.log("hotels", hotels);
      } catch (err) {
        setError("Failed to fetch Hotels");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <ModalProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar offers={offers} />
        <main>
          {loading && (
            <p className="text-center text-gray-600">Loading offers...</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/social-event" element={<SocialEventPage />} />
            <Route path="/wedding-event" element={<WeddingEventPage />} />
            <Route path="/occasion-event" element={<OccasionEventPage />} />
            <Route path="/corporate-event" element={<CorporateEventPage />} />
            {/* <Route path="/home/jaipurroute" element={<JaipurPage />} />
            <Route path="/home/shahpuraroute" element={<ShahpuraPage />} />
            <Route path="/home/bagruroute" element={<BagruPage />} />
            <Route path="/home/behrorroute" element={<BehrorPage />} />
            <Route path="/home/neelkaroute" element={<NeelkaPage />} />
            <Route path="/home/neemranaroute" element={<NeemranaPage />} />
            <Route path="/home/bilaspurroute" element={<BilaspurPage />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/corporate-booking" element={<CorporateBooking />} />
            <Route path="/rooms" element={<Room />} /> {/* Add this route */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/career" element={<Career />} />
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/blog/:id" element={<BlogDetail/>}/>
            {hotels.map((hotel) => (
              <Route
                key={hotel._id}
                path={`${hotel.link}`} // Create URL-friendly paths
                element={<PropertyPage hotel={hotel} />}
              />
            ))}
            {/* {hotels.map((hotel) => (
              <Route
                key={hotel._id}
                path={`/home/${hotel.title}route`} // Create URL-friendly paths
                element={<PropertyPage hotel={hotel} />}
              />
            ))} */}
          </Routes>
        </main>
        <Footer />
        <Chatbot />
        <OffersModal />
      </div>
    </ModalProvider>
  );
};

export default App;
