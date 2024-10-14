
import { cloudConfig } from "../confiq/cloud.js";
import crypto from "crypto";

// export const handleImageUpload = async (Path) => {
//     try {
//         const result = await cloudConfig.uploader.upload(Path);
//         return result.url; 
//     } catch (error) {
//         console.error("Image upload failed:", error.message);
//         throw error; 
//     }
// };
export const handleImageUpload = async (Path) => {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        
        // Construct the signature string as expected by Cloudinary
        const signatureString = `timestamp=${timestamp}${cloudConfig.config().api_secret}`;
        const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

        // Log signatureString and signature for debugging
        console.log('Signature String:', signatureString);
        console.log('Signature:', signature);

        // Upload to Cloudinary with the generated signature
        const result = await cloudConfig.uploader.upload(Path, {
            api_key: cloudConfig.config().api_key,
            timestamp: timestamp,
            signature: signature
        });

        return result.secure_url; // Get the secure URL of the uploaded image
    } catch (error) {
        console.error("Image upload failed:", error.message);
        throw error;
    }
};