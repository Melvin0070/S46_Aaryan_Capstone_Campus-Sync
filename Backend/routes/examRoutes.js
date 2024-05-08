import express from "express";
import * as examController from "../controllers/examController.js";


const router = express.Router();
const { getExamData, createExam, updateExam } = examController;

router.get("/details", getExamData);
router.post("/create", createExam);
router.put("/update/:id", updateExam);

export default router;