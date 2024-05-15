import express from "express";
import * as studentController from "../controllers/studentController.js";


const router = express.Router();
const { getStudentData, createStudent, updateStudent, deleteStudent } = studentController;

router.get("/details/:ID", getStudentData);
router.post("/create", createStudent);
router.put("/update/:ID", updateStudent);
router.delete("/delete/:ID", deleteStudent);

export default router;