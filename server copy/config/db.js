// config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://9873187051sonu:h0Sb8AnXWr8QcY6F@cluster0.goshn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
        );
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;