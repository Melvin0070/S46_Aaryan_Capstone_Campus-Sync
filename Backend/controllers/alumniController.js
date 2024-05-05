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



// Create a new alumni entry
export const createAlumni = async (req, res) => {
    try {
        // Extract alumni data from request body
        const { name, successStory, passout } = req.body;

        // Check if an alumni entry with the same name already exists
        const existingAlumni = await Alumni.findOne({ name });

        if (existingAlumni) {
            return res.status(400).json({ message: "Alumni with the same name already exists" });
        }

        // Create a new alumni and save to the database
        const newAlumni = new Alumni({ name, successStory, passout });        
        await newAlumni.save();

        // Return success message
        return res.status(201).json({ message: "Alumni created successfully" });

    } catch (error) {
        console.error("Error creating alumni:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};