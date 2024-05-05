import express from "express";
import * as examController from "../controllers/examController.js";


const router = express.Router();
const { getExamData, createExam } = examController;

router.get("/details", getExamData);
router.get("/create", createExam);

export default router;