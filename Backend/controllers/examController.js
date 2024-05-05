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



// Create a new exam entry
export const createExam = async (req, res) => {
    try {
        // Extract exam data from request body
        const { student, ID, exam, date, aggregateScore } = req.body;

        // Check if exam entry with the same ID already exists
        const existingExam = await Exam.findOne({ ID });

        if (existingExam) {
            return res.status(400).json({ message: "Exam with the same ID already exists" });
        }

        // Create a new exam and save to the database
        const newExam = new Exam({ student, ID, exam, date, aggregateScore });     
        await newExam.save();

        // Return success message 
        return res.status(201).json({ message: "Exam created successfully" });

    } catch (error) {
        console.error("Error creating exam:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};