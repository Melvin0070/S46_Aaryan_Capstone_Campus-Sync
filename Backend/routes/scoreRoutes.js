import express from "express";
import * as scoreController from "../controllers/scoreController.js";
import { verifyToken } from '../controllers/jwtMiddleware.js';

const router = express.Router();
const { getScoreData, getAllScores, createScore, updateScore, deleteScore } = scoreController;

router.get("/details/:ID", verifyToken, getScoreData);
router.get('/details', verifyToken, getAllScores);
router.post("/create", verifyToken, createScore);
router.put("/update/:ID/:id", verifyToken, updateScore);
router.delete("/delete/:ID/:id", verifyToken, deleteScore);

export default router;
