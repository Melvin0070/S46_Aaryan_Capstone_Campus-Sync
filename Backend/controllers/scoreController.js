import Score from "../models/scoreSchema.js";

// Get score details
export const getScoreData = async (req, res) => {
    try {
        const subject = req.params.subject;
        const score = await Score.findOne({ subject });

        if (!score) {
            return res.status(404).json({ message: "Scores not found for the subject" });
        }

        // If score is found, return the score data (subject and score)
        return res.status(200).json(score);

    } catch (error) {
        console.error("Error fetching scores:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Create a new score entry
export const createScore = async (req, res) => {
    try {
        // Extract score data from request body
        const { subject, score } = req.body;

        // Create a new score and save to the database
        const newScore = new Score({ subject, score });        
        await newScore.save();

        // Return success message 
        return res.status(201).json({ message: "Score entry created successfully" });

    } catch (error) {
        console.error("Error creating score entry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Update an existing score entry
export const updateScore = async (req, res) => {
    try {
        // Extract subject from request parameters and updated score data from request body
        const subject = req.params.subject;        
        const { score } = req.body;

        // Find the score entry by subject and if score entry does not exist, return 404 Not Found
        let existingScore = await Score.findOne({ subject });
        
        if (!existingScore) {
            return res.status(404).json({ message: "Score entry not found for the subject" });
        }

        // Update score information and save the updated score entry and return success message
        existingScore.score = score;
        await existingScore.save();        

        return res.status(200).json({ message: "Score entry updated successfully" });

    } catch (error) {
        console.error("Error updating score entry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Delete an existing score entry
export const deleteScore = async (req, res) => {
    try {
        // Extract subject from request parameters
        const subject = req.params.subject;

        // Find the score entry by subject and if the score entry does not exist, return 404 Not Found
        const existingScore = await Score.findOne({ subject });

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
