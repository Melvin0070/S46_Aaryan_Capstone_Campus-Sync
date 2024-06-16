import User from '../models/userSchema.js';
import { generateToken, generateRefreshToken, removeRefreshToken } from './jwtMiddleware.js';
import jwt from 'jsonwebtoken';

// Login user and generate tokens
export const loginUser = async (req, res) => {
  try {
    const { ID } = req.body;
    const user = await User.findOne({ ID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const accessToken = generateToken({ ID: user.ID });
    const refreshToken = generateRefreshToken({ ID: user.ID });

    return res.status(200).json({ user, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Refresh access token using refresh token
export const refreshToken = (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(403).json({ message: 'No refresh token provided' });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      const accessToken = generateToken({ ID: decoded.ID });
      res.json({ accessToken });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// Logout user and remove refresh token
export const logout = (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'No refresh token provided' });
    }
    removeRefreshToken(refreshToken);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
