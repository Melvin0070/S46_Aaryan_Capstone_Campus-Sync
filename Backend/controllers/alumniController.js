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



// Update an existing alumni entry
export const updateAlumni = async (req, res) => {
    try {
        // Extract alumni ID from request parameters and extract updated alumni data from request body
        const alumniId = req.params.id;        
        const { name, successStory, passout } = req.body;

        // Find the alumni entry by ID and if alumni entry does not exist, return 404 Not Found
        let foundAlumni = await Alumni.findById(alumniId);

        if (!foundAlumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }

        // Update alumni data with new values and save the updated alumni data and return success message 
        foundAlumni.name = name || foundAlumni.name;
        foundAlumni.successStory = successStory || foundAlumni.successStory;
        foundAlumni.passout = passout || foundAlumni.passout;

        await foundAlumni.save();
        
        return res.status(200).json({ message: "Alumni updated successfully", alumni: foundAlumni });

    } catch (error) {
        console.error("Error updating alumni:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
