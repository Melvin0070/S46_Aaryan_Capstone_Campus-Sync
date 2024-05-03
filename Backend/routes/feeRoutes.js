import express from "express";
import * as feeController from "../controllers/feeController.js";


const router = express.Router();
const { getFeeData } = feeController;

router.get("/details", getFeeData);

export default router;