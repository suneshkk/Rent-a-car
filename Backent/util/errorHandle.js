

export const errorHandle = async (error, req, res, next) => {
    try {
        const statusCode = error.statusCode || 500;
        const message = error.message || "somthing went wrong, please try again";

       return res.status(statusCode).json({ message });

    } catch (error) {
       return res.status(500).json({ error:message });

    }
}