import User from '../models/userSchema.js';
import { generateToken } from './jwtMiddleware.js';

// Login user and generate token
export const loginUser = async (req, res) => {
  try {
    const { ID } = req.body; // Assuming ID corresponds to the user's identifier
    const user = await User.findOne({ ID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const accessToken = generateToken({ ID: user.ID }); // Generate token based on user's ID

    return res.status(200).json({ user, accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


