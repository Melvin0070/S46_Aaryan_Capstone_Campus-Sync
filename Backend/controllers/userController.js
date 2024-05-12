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



// Login user
export const loginUser = async (req, res) => {
    try {
        // Extract login credentials from request body
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // If user exists and password is correct, return success message
        return res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Update an existing user
export const updateUser = async (req, res) => {
    try {
        // Extract user ID from request parameters and extract updated user data from request body
        const userId = req.params.id;
        const { username, email, password } = req.body;

        // Find the user by ID and if user does not exist, return 404 Not Found
        let user = await User.findOne({ ID: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user data with new values and save the updated user data and return success message
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;

        await user.save();
        
        return res.status(200).json({ message: "User updated successfully", user });

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Delete an existing user
export const deleteUser = async (req, res) => {
    try {
        // Extract user ID from request parameters
        const userId = req.params.id;

        // Find the user by ID and if user does not exist, return 404 Not Found
        const user = await User.findOne({ ID: userId });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user from the database and return success message
        await User.deleteOne({ ID: userId });
        
        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};