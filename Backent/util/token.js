import jwt from 'jsonwebtoken';

export const generateToken = (id, role) => {
    try {
        var token = jwt.sign({ id: id, role: role || "user" }, process.env.JWT_KEY_SECRET);
        return token;

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "internal server error" });

    }
}
