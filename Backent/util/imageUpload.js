
import { cloudConfig } from "../confiq/cloud.js";

export const handleImageUpload = async (Path) => {
    try {
        const result = await cloudConfig.uploader.upload(Path);
        console.log("result",result)
        return result.url; 
    } catch (error) {
        console.error("Image upload failed:", error.message);
        throw error; 
    }
};
