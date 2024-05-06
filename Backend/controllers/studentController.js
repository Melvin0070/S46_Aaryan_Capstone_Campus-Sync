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
        // Extract student ID from request parameters
        const studentId = req.params.id;

        // Extract updated student data from request body
        const { name, guardian, email, class: studentClass, sec, rollNumber, bloodGroup, contacts } = req.body;

        // Find the student by ID
        let student = await Student.findOne({ ID: studentId });

        // If student does not exist, return 404 Not Found
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Update student information
        student.name = name;
        student.guardian = guardian;
        student.email = email;
        student.class = studentClass;
        student.sec = sec;
        student.rollNumber = rollNumber;
        student.bloodGroup = bloodGroup;
        student.contacts = contacts;

        // Save the updated student information
        await student.save();

        // Return success message
        return res.status(200).json({ message: "Student updated successfully" });

    } catch (error) {
        console.error("Error updating student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
