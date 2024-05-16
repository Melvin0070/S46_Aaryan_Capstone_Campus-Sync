import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION);
        console.log('📦 connected to mongoDB');
    } catch (err) {
        console.error('❌ error connecting to mongoDB:', err.message);
    }
};

const isConnected = () => {
    return mongoose.connection.readyState === 1;
};

export { connectToDB, isConnected };
