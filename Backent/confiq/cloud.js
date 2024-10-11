import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

//must confic dotenv 
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,
});
export const cloudConfig = cloudinary; 