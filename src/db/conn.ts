// db.ts
import mongoose from 'mongoose';
import config from '../config';
const MONGODB_URI = config.MONGO_URI;

const connectDB = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error('MongoDB connection URI is missing');
        }
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
