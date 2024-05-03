import Student from "../models/studentSchema.js";

// Get student details
export const getStudentData = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findOne({ ID: studentId });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // If student is found, return the student data
        return res.status(200).json(student);

    } catch (error) {
        console.error("Error fetching student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};