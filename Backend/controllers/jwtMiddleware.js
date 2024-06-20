// Import JWT and access secret key
import jwt from 'jsonwebtoken';
const accessSecretKey = process.env.JWT_ACCESS_SECRET;

// Function to generate access token
export const generateToken = (user) => {
  return jwt.sign({ ID: user.ID }, accessSecretKey, { expiresIn: '1h' });
};

// Middleware to verify access token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Get the authorization header
  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Split the authHeader to get the token part
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, accessSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.ID; // Attach user ID to request object
    next();
  });
};

