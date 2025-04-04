import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";
import { Menu, X, ChevronDown, Building2 } from "lucide-react";
import logo from "../images/logo1.png";

const NavLink = ({ to, children, closeMenu }) => (
  <Link
    to={to}
    className="group text-amber-900 bg-transparent transition-all duration-300 py-2 px-3 relative font-bold m-0 hover:text-amber-600 hover:bg-amber-100 hover:rounded-md"
    onClick={closeMenu}
  >
    {children}
  </Link>
);

const Navbar = ({ offers }) => {
  const { openModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPartyEventsOpen, setIsPartyEventsOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleMobileOfferClick = (e) => {
    e.preventDefault();
    openModal(offers);
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const routeMap = {
    Home: "/",
    About: "/about",
    Rooms: "/rooms",
    Gallery: "/gallery",
    Blog: "/blog",
    Career: "/career",
    "Corporate Booking": "/corporate-booking",
  };

  const locationRoutes = [
    { name: "Jaipur", path: "/home/Jaipurroute" },      // Added leading "/"
    { name: "Shahpura", path: "/home/shahpuraroute" },  // Added leading "/"
    { name: "Behror", path: "/home/behrorroute" },      // Added leading "/"
    { name: "Bilaspur", path: "/home/bilaspurroute" },  // Added leading "/"
    { name: "Neemrana", path: "/home/neemranaroute" },  // Added leading "/"
    { name: "Neelka", path: "/home/neelkaroute" },      // Added leading "/"
    { name: "Bagru", path: "/home/bagruroute" },        // Already had "/"
  ];

  const party_events = [
    { name: "Social Events", path: "/social-event" },     // Added leading "/"
    { name: "Wedding Functions", path: "/wedding-event" },// Added leading "/"
    { name: "Occasion Events", path: "/occasion-event" }, // Added leading "/"
    { name: "Corporate Event", path: "/corporate-event" },// Added leading "/"
  ];

  return (
    <header className={`w-full transition-all duration-300 ease-in-out shadow-sm`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center space-x-3 text-xl md:text-2xl font-bold text-amber-600 tracking-wide transition-all duration-300 decoration-none focus:outline-none"
          >
            <img src={logo} alt="Hotel Highway King" className="h-10 md:h-16" />
            <span>Highway King</span>
          </Link>

          <div className="hidden md:flex items-center justify-end flex-1 space-x-8">
            <nav className="flex items-center space-x-8 font-bold gap-2">
              <NavLink to="/" closeMenu={closeMenu}>Home</NavLink>
              <NavLink to="/about" closeMenu={closeMenu}>About</NavLink>

              {/* Party & Events Dropdown */}
              <div
                className="relative group m-0"
                onMouseEnter={() => setIsPartyEventsOpen(true)}
                onMouseLeave={() => setIsPartyEventsOpen(false)}
              >
                <button className="font-bold hover:text-amber-600 hover:bg-amber-100 hover:rounded-md flex items-center space-x-1 transition-all duration-300 py-2 px-3 text-amber-900 cursor-pointer">
                  <span>Party & Events</span>
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                      isPartyEventsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute z-10 left-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 ease-in-out ${
                    isPartyEventsOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  {party_events.map((event) => (
                    <Link
                      key={event.path}
                      to={event.path}
                      className="block px-4 py-2 text-black hover:bg-blue-50 hover:text-amber-600 transition-all duration-200"
                      onClick={closeMenu}
                    >
                      {event.name}
                    </Link>
                  ))}
                </div>
              </div>

              <NavLink to="/gallery" closeMenu={closeMenu}>Gallery</NavLink>
              <NavLink to="/career" closeMenu={closeMenu}>Career</NavLink>
              <NavLink to="/blog" closeMenu={closeMenu}>Blog</NavLink>
              {/* Location Dropdown */}
              <div
                className="relative group m-0"
                onMouseEnter={() => setIsLocationOpen(true)}
                onMouseLeave={() => setIsLocationOpen(false)}
              >
                <button className="font-bold hover:text-amber-600 hover:bg-amber-100 hover:rounded-md flex items-center space-x-1 transition-all duration-300 py-2 px-3 text-amber-900 cursor-pointer">
                  <span>Location</span>
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                      isLocationOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute z-10 left-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 ease-in-out ${
                    isLocationOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  {locationRoutes.map((location) => (
                    <Link
                      key={location.path}
                      to={location.path}
                      className="block px-4 py-2 text-black hover:bg-blue-50 hover:text-amber-600 transition-all duration-200"
                      onClick={closeMenu}
                    >
                      {location.name}
                    </Link>
                  ))}
                </div>
              </div>

              <NavLink onClick={handleMobileOfferClick}>Offers</NavLink>
              <NavLink to="/corporate-booking" closeMenu={closeMenu}>
                Corporate Booking
              </NavLink>
              <NavLink to="/franchise" closeMenu={closeMenu}>Franchise</NavLink>
            </nav>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-amber-900 p-2 focus:outline-none"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 backdrop-blur-md bg-opacity-40 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-800 bg-opacity-90 backdrop-blur-sm z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button onClick={() => setIsMenuOpen(false)} className="text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col px-4 py-2 space-y-4">
            {["Home", "About", "Rooms", "Gallery", "Location", "Blog", "Career", "Corporate Booking"].map((item) => (
              <NavLink key={item} to={routeMap[item]} closeMenu={closeMenu}>
                {item}
              </NavLink>
            ))}
            <button
              onClick={handleMobileOfferClick}
              className="text-left text-gray-200 hover:text-yellow-400 transition-all duration-300 py-2 relative group"
            >
              Offers
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-red-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
            <Link
              to="/franchise"
              className="flex items-center space-x-3 text-gray-200 hover:text-yellow-400 py-2"
              onClick={closeMenu}
            >
              <Building2 className="w-5 h-5" />
              <span>Franchise Opportunities</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;