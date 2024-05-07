import express from "express";
import * as feeController from "../controllers/feeController.js";


const router = express.Router();
const { getFeeData, createFee, updateFee } = feeController;

router.get("/details", getFeeData);
router.post("/create", createFee);
router.put("/update/:id", updateFee);

export default router;