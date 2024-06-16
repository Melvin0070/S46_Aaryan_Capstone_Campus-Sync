import jwt from 'jsonwebtoken';

const accessSecretKey = process.env.JWT_ACCESS_SECRET;
const refreshSecretKey = process.env.JWT_REFRESH_SECRET;
const refreshTokens = [];

// Function to generate access token
export const generateToken = (user) => {
  return jwt.sign({ ID: user.ID }, accessSecretKey, { expiresIn: '10s' });
};

// Function to generate refresh token
export const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ ID: user.ID }, refreshSecretKey, { expiresIn: '7d' });
  refreshTokens.push(refreshToken);
  return refreshToken;
};

// Middleware to verify access token
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // Get the access token from headers
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

// Middleware to verify refresh token
export const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken; // Get the refresh token from body
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  jwt.verify(refreshToken, refreshSecretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate refresh token' });
    }
    req.userId = decoded.ID; // Attach user ID to request object
    next();
  });
};

// Function to remove refresh token from the list
export const removeRefreshToken = (refreshToken) => {
  const index = refreshTokens.indexOf(refreshToken);
  if (index > -1) {
    refreshTokens.splice(index, 1);
  }
};
