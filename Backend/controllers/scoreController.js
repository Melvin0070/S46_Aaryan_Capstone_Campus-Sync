import Score from "../models/scoreSchema.js";

// Get score details by student ID
export const getScoreData = async (req, res) => {
    try {
        const ID = req.params.ID;
        const score = await Score.findOne({ ID:ID });

        if (!score) {
            return res.status(404).json({ message: "Scores not found for the student" });
        }

        // If score is found, return the score data
        return res.status(200).json(score);

    } catch (error) {
        console.error("Error fetching scores:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const createScore = async (req, res) => {
    try {
        // Extract name, ID, and exam details from request body
        const { name, ID, details } = req.body;

        // Find the score entry by student ID
        let existingScore = await Score.findOne({ ID: ID });

        if (!existingScore) {
            // If score entry does not exist, create a new one
            existingScore = new Score({
                name,
                ID,
                details: [details] // Push the new exam details into the array
            });
        } else {
            // If score entry exists, push the new exam details into the existing details array
            existingScore.details.push(details);
        }

        // Save the updated score entry
        await existingScore.save();

        return res.status(201).json({ message: "Score entry created successfully", existingScore });

    } catch (error) {
        console.error("Error creating score entry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




export const updateScore = async (req, res) => {
    try {
        // Extract subject from request parameters and updated score data from request body
        const ID = req.params.ID
        const { subject, score } = req.body;

        // Find the score entry by subject
        let existingScore = await Score.findOne({ ID:ID });
        
        // If score entry does not exist, return 404 Not Found
        if (!existingScore) {
            return res.status(404).json({ message: "Score entry not found for the subject" });
        }

        // Update score information
        existingScore.subject = subject || existingScore.subject;
        existingScore.score = score || existingScore.score;

        // Save the updated score entry and return success message
        await existingScore.save();        

        return res.status(200).json({ message: "Score entry updated successfully", existingScore });

    } catch (error) {
        console.error("Error updating score entry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Delete an existing score entry
export const deleteScore = async (req, res) => {
    try {
        // Extract subject from request parameters
        const ID = req.params.ID;

        // Find the score entry by subject and if the score entry does not exist, return 404 Not Found
        const existingScore = await Score.findOne({ID:ID});

        if (!existingScore) {
            return res.status(404).json({ message: "Score entry not found for the subject" });
        }

        // Delete the score entry from the database and return success message
        await existingScore.deleteOne();
        
        return res.status(200).json({ message: "Score entry deleted successfully" });

    } catch (error) {
        console.error("Error deleting score entry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
