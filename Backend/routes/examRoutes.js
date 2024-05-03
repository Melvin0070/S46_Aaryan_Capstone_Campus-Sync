import express from "express";
import * as examController from "../controllers/examController.js";


const router = express.Router();
const { getExamData } = examController;

router.get("/details", getExamData);

export default router;