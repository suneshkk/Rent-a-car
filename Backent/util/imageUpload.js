
import { cloudConfig } from "../confiq/cloud.js";


export const handleImageUpload = async (path) => {
    try {
        const uploadResult = await cloudConfig.uploader.upload(path);
        return uploadResult.url;
    } catch (error) {
        throw new Error(`Image upload failed: ${error.message}`);  // Throw the error to handle it upstream

    };
};