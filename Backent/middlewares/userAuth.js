import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
  try {
    // Extract the token from cookies
    const { token } = req.cookies;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: 'User not authorized', success: false });
    }

    // Verify the token with the secret key
    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // If token verification fails, handle it in the catch block
    if (!tokenVerified) {
      return res.status(401).json({ message: 'User not authorized', success: false });
    }


    // Attach the verified user data to the request object
    req.user = tokenVerified;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors during verification
    return res.status(401).json({ message: 'User authorization failed' });
  }
};
