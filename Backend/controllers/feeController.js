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



// Update an existing fee entry
export const updateFee = async (req, res) => {
    try {
        // Extract fee ID from request parameters and extract updated fee data from request body
        const feeId = req.params.id;     
        const { name, amount, details, status } = req.body;

        // Find the fee entry by ID and if fee entry does not exist, return 404 Not Found
        let fee = await Fee.findOne({ ID: feeId });        
        if (!fee) {
            return res.status(404).json({ message: "Fee not found" });
        }

        // Update fee data with new values and save the updated fee data and return success message 
        fee.name = name || fee.name;
        fee.amount = amount || fee.amount;
        fee.details = details || fee.details;
        fee.status = status || fee.status;
        
        await fee.save();
        
        return res.status(200).json({ message: "Fee updated successfully", fee });

    } catch (error) {
        console.error("Error updating fee:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Delete an existing fee entry
export const deleteFee = async (req, res) => {
    try {
        // Extract fee ID from request parameters
        const feeId = req.params.id;

        // Find the fee entry by ID and if the fee entry does not exist, return 404 Not Found
        const existingFee = await Fee.findOne({ ID: feeId });

        if (!existingFee) {
            return res.status(404).json({ message: "Fee not found" });
        }

        // Delete the fee entry from the database and return success message
        await existingFee.deleteOne();
        
        return res.status(200).json({ message: "Fee deleted successfully" });

    } catch (error) {
        console.error("Error deleting fee:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};