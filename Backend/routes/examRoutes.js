import express from "express";
import * as examController from "../controllers/examController.js";


const router = express.Router();
const { getExamData, createExam, updateExam, deleteExam } = examController;

router.get("/details/:ID", getExamData);
router.post("/create", createExam);
router.put("/update/:ID", updateExam);
router.delete("/delete/:ID", deleteExam);

export default router;