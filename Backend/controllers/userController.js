import User from "../models/userSchema.js";

// Login user
export const loginUser = async (req, res) => {
    try {
        const ID = req.params.ID;
        const user = await User.findOne({ ID: ID });

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



// Create a new user(Signup)
export const createUser = async (req, res) => {
    try {
        // Extract user data from request body
        const { username, ID, email, password } = req.body;

        // Check if user with the same ID already exists
        const existingUser = await User.findOne({ ID });

        if (existingUser) {
            return res.status(400).json({ message: "User with the same ID already exists" });
        }

        // Create a new user instance
        const newUser = new User({ username, ID, email, password });

        // Save the new user to the database and return success message with status code 201
        await newUser.save();
        
        return res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Delete an existing user
export const deleteUser = async (req, res) => {
    try {
        // Extract user ID from request parameters
        const userId = req.params.id;

        // Find the user by ID and if user does not exist, return 404 Not Found
        const user = await User.findOne({ _id: userId });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user from the database and return success message
        await User.deleteOne({ _id: userId });
        
        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};