import express from "express";
import * as feeController from "../controllers/feeController.js";


const router = express.Router();
const { getFeeData, createFee } = feeController;

router.get("/details", getFeeData);
router.get("/create", createFee);

export default router;