import express from "express";
import * as studentController from "../controllers/studentController.js";


const router = express.Router();
const { getStudentData, createStudent } = studentController;

router.get("/details", getStudentData);
router.post("/create", createStudent);

export default router;