import Score from "../models/scoreSchema.js";

// Get score details
export const getScoreData = async (req, res) => {
    try {
        const subject = req.params.subject;
        const scores = await Score.find({ subject });

        if (scores.length === 0) {
            return res.status(404).json({ message: "Scores not found for the subject" });
        }

        // If scores are found, return the score data (subject and score)
        return res.status(200).json(scores.map(score => ({ subject: score.subject, score: score.score })));

    } catch (error) {
        console.error("Error fetching scores:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};