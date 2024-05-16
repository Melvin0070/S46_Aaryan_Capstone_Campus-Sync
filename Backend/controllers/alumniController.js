import Alumni from "../models/alumniSchema.js";

// Get all alumnis
export const getAlumniData = async (req, res) => {
    try {
        // Retrieve all alumnis from the database and return the alumnis
        const alumnis = await Alumni.find({});

        return res.status(200).json(alumnis);
        
    } catch (error) {
        console.error("Error fetching alumnis:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Create a new alumni entry
export const createAlumni = async (req, res) => {
    try {
        // Extract alumni data from request body
        const { name, successStory, passout } = req.body;

        // Check if an alumni entry with the same name already exists
        const existingAlumni = await Alumni.findOne({ name, successStory, passout });

        if (existingAlumni) {
            return res.status(400).json({ message: "Alumni with the same data already exists" });
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
        const _id = req.params.id;        
        const { name, successStory, passout } = req.body;

        // Find the alumni entry by ID and if alumni entry does not exist, return 404 Not Found
        let foundAlumni = await Alumni.findById(_id);

        if (!foundAlumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }

        // Update alumni data with new values and save the updated alumni data and return success message 
        if (name) foundAlumni.name = name 
        if (successStory) foundAlumni.successStory = successStory 
        if (passout) foundAlumni.passout = passout

        await foundAlumni.save();
        
        return res.status(200).json({ message: "Alumni updated successfully", alumni: foundAlumni });

    } catch (error) {
        console.error("Error updating alumni:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Delete an existing alumni entry
export const deleteAlumni = async (req, res) => {
    try {
        // Extract alumni ID from request parameters
        const _id = req.params.id;

        // Find the alumni entry by ID and if the alumni entry does not exist, return 404 Not Found
        const existingAlumni = await Alumni.findById(_id);
        
        if (!existingAlumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }

        // Delete the alumni entry from the database and return success message
        await existingAlumni.deleteOne();
       
        return res.status(200).json({ message: "Alumni deleted successfully" });

    } catch (error) {
        console.error("Error deleting alumni:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};