// models/offer.js
import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    title: String,
    description: String,
    discount: Number,
    validUntil: String,
    status: { type: String, default: 'active' },
    date: { type: Date, default: Date.now },
});

export default mongoose.model('Offer', offerSchema);