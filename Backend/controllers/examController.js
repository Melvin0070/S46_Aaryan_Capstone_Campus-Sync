import Exam from "../models/examSchema.js";

// Get exam details
export const getExamData = async (req, res) => {
    try {
        const examId = req.params.id;
        const exam = await Exam.findOne({ ID: examId });

        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        // If exam is found, return the exam data
        return res.status(200).json(exam);

    } catch (error) {
        console.error("Error fetching exam:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};