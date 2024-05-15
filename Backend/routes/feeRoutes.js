import express from "express";
import * as feeController from "../controllers/feeController.js";


const router = express.Router();
const { getFeeData, createFee, updateFee, deleteFee } = feeController;

router.get("/details/:ID", getFeeData);
router.post("/create", createFee);
router.put("/update/:ID", updateFee);
router.delete("/delete/:ID", deleteFee);

export default router;