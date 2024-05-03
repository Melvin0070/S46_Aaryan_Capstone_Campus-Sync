import Alumni from "../models/alumniSchema.js";

// Get alumni details
export const getAlumniData = async (req, res) => {
    try {
        const alumniId = req.params.id;
        const alumni = await Alumni.findById(alumniId);

        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }

        // If alumni is found, return the alumni data
        return res.status(200).json(alumni);
        
    } catch (error) {
        console.error("Error fetching alumni:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};