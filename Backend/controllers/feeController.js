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