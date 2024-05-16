import Score from "../models/scoreSchema.js";

// Get score details by student ID
export const getScoreData = async (req, res) => {
    try {
        const ID = req.params.ID;
        const score = await Score.findOne({ ID: ID });

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



// Create a new score entry
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
                details: details
            });
        } else {
            // If score entry exists, push the new exam details into the existing details array
            existingScore.details.push(...details);
        }

        // Save the updated score entry and return success message
        await existingScore.save();

        return res.status(201).json({ message: "Score entry created successfully", existingScore });

    } catch (error) {
        console.error("Error creating score entry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Update an existing score entry
export const updateScore = async (req, res) => {
    try {
        // Extract student ID and score entry id from request parameters
        const { ID, id } = req.params;

        // Extract updated score details from request body
        const { details } = req.body;
        const { exam, scores, aggregateScore, subjects, date } = details[0];

        // Find the existing score entry by student ID and if score entry not found, return 404 Not Found
        let existingScore = await Score.findOne({ ID: ID });

        if (!existingScore) {
            return res.status(404).json({ message: "Score entry not found" });
        }

        // Find the specific detail within the score entry by its _id and if detail not found, return 404 Not Found
        let detail = existingScore.details.id(id);

        if (!detail) {
            return res.status(404).json({ message: "Exam entry not found" });
        }

        // Update detail fields if provided
        if (exam) detail.exam = exam;
        if (date) detail.date = date;
        if (aggregateScore) detail.aggregateScore = aggregateScore;

        // Update subjects and scores arrays if provided
        if (subjects && scores) {
            detail.subjects = subjects;
            detail.scores = scores;
        }

        // Save the updated score entry and return success message
        await existingScore.save();
       
        return res.status(200).json({ message: "Exam entry updated successfully" });

    } catch (error) {
        console.error("Error updating detail entry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




// Delete an existing score entry
export const deleteScore = async (req, res) => {
    try {
        // Extract subject from request parameters
        const { ID, id } = req.params;

        // Find the score entry by subject and if the score entry does not exist, return 404 Not Found
        const existingScore = await Score.findOne({ ID: ID });

        if (!existingScore) {
            return res.status(404).json({ message: "Score entry not found" });
        }

        // Using pull operator to remove the detail from the details array by its _id and save the updated document
        existingScore.details.pull({ _id: id });

        await existingScore.save();

        return res.status(200).json({ message: "Exam entry deleted successfully" });

    } catch (error) {
        console.error("Error deleting score entry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
