import Fee from "../models/feeSchema.js";

// Get fee details
export const getFeeData = async (req, res) => {
    try {
        const feeId = req.params.id;
        const fee = await Fee.findOne({ ID: feeId });

        if (!fee) {
            return res.status(404).json({ message: "Fee not found" });
        }

        // If fee is found, return the fee data
        return res.status(200).json(fee);

    } catch (error) {
        console.error("Error fetching fee:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Create a new fee entry
export const createFee = async (req, res) => {
    try {
        // Extract fee data from request body
        const { name, ID, amount, details, status } = req.body;

        // Check if fee entry with the same ID already exists
        const existingFee = await Fee.findOne({ ID });

        if (existingFee) {
            return res.status(400).json({ message: "Fee with the same ID already exists" });
        }

        // Create a new fee and save to the database
        const newFee = new Fee({ name, ID, amount, details, status });        
        await newFee.save();

        // Return success message 
        return res.status(201).json({ message: "Fee created successfully" });

    } catch (error) {
        console.error("Error creating fee:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};