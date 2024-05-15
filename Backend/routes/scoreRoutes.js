import express from "express";
import * as scoreController from "../controllers/scoreController.js";


const router = express.Router();
const { getScoreData, createScore, updateScore, deleteScore } = scoreController;

router.get("/details/:ID", getScoreData);
router.post("/create", createScore);
router.put("/update/:ID", updateScore);
router.delete("/delete/:ID", deleteScore);


export default router;