// const express = require('express');
import express from 'express';
import Hotel from '../models/hotel.js'; // Import Hotel model
const router = express.Router();

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find(); // Fetch all hotels
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ message: 'Error fetching hotels', error: error.message });
  }
});

router.post('/', async (req, res) => {
    try {
      const { title, desc, about, amenities, popularNearbyAttractions, price, longitude, latitude, location, bedrooms, guests, baths, link } = req.body;
  
      // Validate required fields
      if (!title || !desc || !about || !price || !longitude || !latitude) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newHotel = new Hotel({
        title,
        desc,
        about,
        amenities: amenities || [],
        popularNearbyAttractions: popularNearbyAttractions || [],
        price,
        longitude,
        latitude,
        location, 
        bedrooms, 
        guests, 
        baths, 
        link
      });
  
      await newHotel.save(); // Save to database
      res.status(201).json(newHotel); // Return the created hotel
    } catch (error) {
      console.error('Error creating hotel:', error);
      res.status(500).json({ message: 'Error creating hotel', error: error.message });
    }
  });

// module.exports = router;
export default router;
