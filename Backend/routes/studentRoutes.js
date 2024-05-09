import express from "express";
import * as studentController from "../controllers/studentController.js";


const router = express.Router();
const { getStudentData, createStudent, updateStudent, deleteStudent } = studentController;

router.get("/details", getStudentData);
router.post("/create", createStudent);
router.put("/update/:studentID", updateStudent);
router.delete("/delete/:id", deleteStudent);

export default router;