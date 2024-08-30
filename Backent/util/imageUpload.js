import { cloudConfig } from "../confiq/cloud.js";

export const handleImageUpload = async (path) => {
    try {
        const uploadResult = await cloudConfig.uploader.upload(path);
        return uploadResult.url;
    } catch (error) {
        next(error)
    };
};