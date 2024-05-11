import express from "express";
import * as scoreController from "../controllers/scoreController.js";


const router = express.Router();
const { getScoreData, createScore, updateScore, deleteScore } = scoreController;

router.get("/details", getScoreData);
router.post("/create", createScore);
router.put("/update/:subject", updateScore);


export default router;