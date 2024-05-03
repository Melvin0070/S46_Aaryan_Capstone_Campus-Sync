import User from "../models/userSchema.js";

// Get user details
export const getUserData = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ ID: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If user is found, return the user data
        return res.status(200).json(user);

    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};