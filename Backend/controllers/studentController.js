import Student from "../models/studentSchema.js";

// Get student details
export const getStudentData = async (req, res) => {
    try {
        const ID = req.params.ID;
        const student = await Student.findOne({ ID: ID });

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



// Create a new student
export const createStudent = async (req, res) => {
    try {
        // Extract student data from request body
        const { name, guardian, ID, email, class: studentClass, sec, rollNumber, bloodGroup, contacts } = req.body;

        // Check if student with the same ID already exists
        const existingStudent = await Student.findOne({ ID });

        if (existingStudent) {
            return res.status(400).json({ message: "Student with the same ID already exists" });
        }

        // Create a new student and save  to the database
        const newStudent = new Student({ name, guardian, ID, email, class: studentClass, sec, rollNumber, bloodGroup, contacts });        
        await newStudent.save();

        // Return success message
        return res.status(201).json({ message: "Student created successfully" });

    } catch (error) {
        console.error("Error creating student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Update an existing student
export const updateStudent = async (req, res) => {
    try {
        // Extract student ID from request parameters and updated student data from request body
        const ID = req.params.ID;        
        const { name, guardian, email, class: studentClass, sec, rollNumber, bloodGroup, contacts } = req.body;

        // Find the student by ID and if student does not exist, return 404 Not Found
        let student = await Student.findOne({ID:ID});

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Update student information and save the updated student information and return success message
        if (name) student.name = name;
        if (guardian) student.guardian = guardian;
        if (email) student.email = email;
        if (studentClass) student.class = studentClass;
        if (sec) student.sec = sec;
        if (rollNumber) student.rollNumber = rollNumber;
        if (bloodGroup) student.bloodGroup = bloodGroup;
        if (contacts) student.contacts = contacts ;
        
        await student.save();
        
        return res.status(200).json({ message: "Student updated successfully", student });

    } catch (error) {
        console.error("Error updating student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Delete an existing student
export const deleteStudent = async (req, res) => {
    try {
        // Extract student ID from request parameters
        const ID = req.params.ID;

        // Find the student by ID and delete it
        const deletedStudent = await Student.findOneAndDelete({ID: ID});

        // If student does not exist, return 404 Not Found
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Return success message
        return res.status(200).json({ message: "Student deleted successfully" });

    } catch (error) {
        console.error("Error deleting student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
