import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { User, Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Default testimonials as fallback
const defaultTestimonials = [
  {
    id: 1,
    name: "Anand Kumar",
    review:
      "Clean, reasonably priced hotel close to the airport (hard to find all 3)..",
    role: "Business Traveler",
  },
  {
    id: 2,
    name: "Pinki Singh",
    review:
      "I booked this hotel for my solo trip for business. Very comfortable stay, and highly recommended for female solo travelers.",
    role: "Solo Traveler",
  },
  {
    id: 3,
    name: "Heena Pamecha",
    review:
      "I stayed here for 2 weeks on a business trip. The staff is very helpful and humble. I highly suggest this place for business or family trips.",
    role: "Business Traveler",
  },
  {
    id: 4,
    name: "Rajeev Kumar",
    review:
      "Excellent service, great location, and an overall wonderful experience. Highly recommend this hotel for anyone traveling to the area.",
    role: "Family Traveler",
  },
  {
    id: 5,
    name: "Sonal Sharma",
    review:
      "The hotel exceeded my expectations. Comfortable rooms, friendly staff, and the food was amazing! I would definitely stay again.",
    role: "Leisure Traveler",
  },
  {
    id: 6,
    name: "Manoj Patel",
    review:
      "Amazing experience! The location was perfect, and the amenities were top-notch. I felt at home here and would recommend to others.",
    role: "Business Traveler",
  },
];

// Function to fetch testimonials from Google Places API
const fetchGoogleTestimonials = async (placeId, apiKey) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );
    const data = await response.json();
    if (data.status === "OK" && data.result.reviews) {
      return data.result.reviews.map((review, index) => ({
        id: index + 1,
        name: review.author_name,
        review: review.text,
        role: "Guest",
      }));
    }
    return defaultTestimonials;
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return defaultTestimonials;
  }
};

const TestimonialSlider = ({ placeId, apiKey }) => {
  const [testimonials, setTestimonials] = React.useState(defaultTestimonials);

  React.useEffect(() => {
    if (placeId && apiKey) {
      fetchGoogleTestimonials(placeId, apiKey).then(setTestimonials);
    }
  }, [placeId, apiKey]);

  return (
    <div className="py-4 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-center mb-4 text-amber-600">
            Hear From Our Guests
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            The biggest reward is to satisfy our guests and share their experience with us.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 1000, // 2 seconds delay between slides
            disableOnInteraction: false, // Continues autoplay even after user interaction
          }}
          loop={true} // Added to ensure continuous rotation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-amber-50 rounded-xl shadow-lg p-8 mx-2 my-8 h-[350px] flex flex-col border-t-4 border-amber-600">
                <div className="relative flex-shrink-0">
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-amber-900 border">
                      <User className="w-8 h-8 text-amber-900" />
                    </div>
                  </div>
                  {/* <div className="pt-8">
                    <Quote className="w-8 h-8 text-yellow-500 mb-4 mx-auto" />
                  </div> */}
                </div>
                <div className="flex-grow overflow-hidden flex flex-col justify-center">
                  <p className="text-gray-600 text-lg italic">{`"${item.review}"`}</p>
                </div>
                <div className="border-t border-amber-900 pt-4 flex-shrink-0">
                  <h4 className="text-xl text-amber-600 font-bold">{item.name}</h4>
                  <p className="font-medium text-amber-900">{item.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-slide {
          height: auto !important; /* Ensure slides stretch to tallest content */
          display: flex; /* Use flex to align content */
          flex-direction: column;
        }
        .swiper-button-prev:after, 
        .swiper-button-next:after {
          font-size: 16px;
        }
        .swiper-pagination-bullet-active {
          background-color: var(--color-amber-600);
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: var(--color-amber-600);
          width: 40px;
          height: 40px;
          border: 1px solid var(--color-amber-600);
          border-radius: 100%;
          background-color: white;
        }
        .swiper-button-disabled {
          display: none !important;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: white;
          background-color: var(--color-amber-500);
        }
        .swiper-pagination {
          position: relative;
          padding-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;