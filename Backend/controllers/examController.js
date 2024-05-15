import Exam from "../models/examSchema.js";

// Get exam details
export const getExamData = async (req, res) => {
    try {
        const ID = req.params.ID;
        const exam = await Exam.findOne({ ID:ID });

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



// Update an existing exam entry
export const updateExam = async (req, res) => {
    try {
        // Extract exam ID from request parameters and  extract updated exam data from request body
        const examId = req.params.id;       
        const { student, exam, date, aggregateScore } = req.body;

        // Find the exam entry by ID and if exam entry does not exist, return 404 Not Found
        let foundExam = await Exam.findOne({ ID: examId });

        if (!foundExam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        // Update exam data with new values and save the updated exam data and return success message 
        foundExam.student = student || foundExam.student;
        foundExam.exam = exam || foundExam.exam;
        foundExam.date = date || foundExam.date;
        foundExam.aggregateScore = aggregateScore || foundExam.aggregateScore;
        
        await foundExam.save();

        return res.status(200).json({ message: "Exam updated successfully", exam: foundExam });

    } catch (error) {
        console.error("Error updating exam:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Delete an existing exam entry
export const deleteExam = async (req, res) => {
    try {
        // Extract exam ID from request parameters
        const examId = req.params.id;

        // Find the exam entry by ID and if the exam entry does not exist, return 404 Not Found
        const existingExam = await Exam.findOne({ ID: examId });
        
        if (!existingExam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        // Delete the exam entry from the database and return success message
        await existingExam.deleteOne();
       
        return res.status(200).json({ message: "Exam deleted successfully" });

    } catch (error) {
        console.error("Error deleting exam:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};