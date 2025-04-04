// const { link, img } = require('framer-motion/client');
import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  about: { type: String, required: true },
  amenities: { type: [String], default: [] },
  popularNearbyAttractions: { type: [String], default: [] },
  price: { type: String, required: true },
  longitude: { type: String, required: true },
  latitude: { type: String, required: true },
  location: { type: String },
  bedrooms: { type: Number },
  guests: { type: Number },
  baths: { type: Number },
  link  : { type: String},
  img: { type: String},
});

const Hotel = mongoose.model('Hotel', hotelSchema);

// module.exports = Hotel;
export default Hotel;
