// server.js
// require('dotenv').config();
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import offerRoutes from './routes/offerRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import franchiseRoutes from './routes/franchiseQueryRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import corporateBookingRoutes from './routes/corporateBookingRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import logger from './middleware/logger.js';
import fs from "fs/promises";
import path from "path";
// import 
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();


// Connect to database
connectDB();

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174']  }));
app.use(bodyParser.json());
app.use(logger);

const uploadDir = path.join(process.cwd(), "uploads/franchise-proposals");
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// Routes
app.get('/', (req,res)=>{
    res.send("App is working fine for hotel highwayking");
})

app.use("/api/admin", adminRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/franchise-queries', franchiseRoutes);
app.use("/api/corporate-bookings", corporateBookingRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/hotels", hotelRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});