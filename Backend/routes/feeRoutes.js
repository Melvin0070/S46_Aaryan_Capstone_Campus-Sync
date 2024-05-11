import express from "express";
import * as feeController from "../controllers/feeController.js";


const router = express.Router();
const { getFeeData, createFee, updateFee, deleteFee } = feeController;

router.get("/details", getFeeData);
router.post("/create", createFee);
router.put("/update/:id", updateFee);
router.delete("/delete/:id", deleteFee);

export default router;