import express from "express";
import * as scoreController from "../controllers/scoreController.js";


const router = express.Router();
const { getScoreData,getAllScores, createScore, updateScore, deleteScore } = scoreController;

router.get("/details/:ID", getScoreData);
router.get('/details',  getAllScores)
router.post("/create", createScore);
router.put("/update/:ID/:id", updateScore);
router.delete("/delete/:ID/:id", deleteScore);


export default router;