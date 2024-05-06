import express from "express";
import * as studentController from "../controllers/studentController.js";


const router = express.Router();
const { getStudentData, createStudent, updateStudent } = studentController;

router.get("/details", getStudentData);
router.post("/create", createStudent);
router.put("/update/:studentID", updateStudent);

export default router;