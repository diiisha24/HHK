import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-amber-100 to-amber-300">

      {/* Upper Section - Gradient Background */}
      <div className="py-10">

        <div className="container mx-auto grid md:grid-cols-3 gap-8 px-6">
          {/* Contact Us */}
          <div>
            <h3 className="text-2xl font-extrabold text-amber-900 mb-4">CONTACT US</h3>
            <p className="flex items-center mb-2 font-medium">
              📧
              <a href="mailto:jaipur@hotelhighwayking.com" className="ml-2 hover:text-amber-700">
                jaipur@hotelhighwayking.com
              </a>
            </p>
            <p className="flex items-center mb-4 font-medium">
              📞
              <a href="tel:+919828879333" className="ml-2 hover:text-amber-700">
                +91 98288 79333
              </a>
            </p>
            {/* Social Media Icons */}
            
            <h5 className="text-md font-extrabold text-amber-900 mb-4">Follow On:</h5>
            <div className="flex space-x-4 mt-4 text-xl">
              <a href="https://www.facebook.com/highwaykingofficial/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors duration-300">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/hotelhighwaykingofficial/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors duration-300">
                <FaInstagram />
              </a>
              <a href="https://in.pinterest.com/hotelhighwaykin/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors duration-300">
                <FaPinterestP />
              </a>
              <a href="https://x.com/hotelhighwayking.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors duration-300">
                <FaTwitter />
              </a>
              <a href="https://www.youtube.com/@Hotelhighwaykingofficial/search" target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors duration-300">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Our Branches */}
          <div>
            <h3 className="text-2xl font-extrabold text-amber-900 mb-4">OUR BRANCHES</h3>
            <ul className="mt-2 space-y-2 font-medium">
              {/* <a href="tel:+919828879111">JAIPUR - +91 98288 79111</a>
              <li>SHAHPURA - +91 98283 38100</li>
              <li>BAGRU - +91 98288 79222</li>
              <li>BEHROR - +91 98288 01444</li>
              <li>NEELKA - +91 98288 31555</li>
              <li>NEEMRANA - +91 98288 59666</li> */}
              <li>
                <a href="tel:+919828879111" className="hover:text-amber-700">
                  JAIPUR - +91 98288 79111
                </a>
              </li>
              <li>
                <a href="tel:+919828879222" className="hover:text-amber-700">
                  BAGRU - +91 98288 79222
                </a>
              </li>
              <li>
                <a href="tel:+919828801444" className="hover:text-amber-700">
                  BEHROR - +91 98288 01444
                </a>
              </li>
              <li>
                <a href="tel:+919828831555" className="hover:text-amber-700">
                  NEELKA - +91 98288 31555
                </a>
              </li>
              <li>
                <a href="tel:+919828859666" className="hover:text-amber-700">
                  NEEMRANA - +91 98288 59666
                </a>
              </li>
              <li>
                <a href="tel:+919828338100" className="hover:text-amber-700">
                  SHAHPURA - +91 98283 38100
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-extrabold text-amber-900 mb-4">QUICK LINKS</h3>
            <ul className="mt-2 space-y-2 font-medium">
              <li>
                <a href="#" className="hover:text-amber-700 transition-colors duration-300">ABOUT</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-700 transition-colors duration-300">SERVICES</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-700 transition-colors duration-300">CUSTOMER SUPPORT</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-700 transition-colors duration-300">CONTACT US</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lower Section - Black Background */}
      <div className="bg-amber-900 text-white font-medium text-center py-4 text-lg">

        <p>© 2025 Kantag Solution All rights reserved.</p>
        <p className="mt-1">
          <a href="#" className="hover:text-amber-700 transition-colors duration-300">Terms & Conditions</a> |
          <a href="#" className="ml-2 hover:text-amber-700 transition-colors duration-300">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
