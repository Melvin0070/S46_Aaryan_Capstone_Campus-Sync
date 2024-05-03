import express from "express";
import * as scoreController from "../controllers/scoreController.js";


const router = express.Router();
const { getScoreData } = scoreController;

router.get("/details", getScoreData);

export default router;