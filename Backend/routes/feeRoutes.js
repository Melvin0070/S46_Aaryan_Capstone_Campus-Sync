import express from "express";
import * as feeController from "../controllers/feeController.js";
import { verifyToken } from '../controllers/jwtMiddleware.js';

const router = express.Router();
const { getFeeData, createFee, updateFee, deleteFee } = feeController;

router.get("/details/:ID", verifyToken, getFeeData);
router.post("/create", verifyToken, createFee);
router.put("/update/:ID", verifyToken, updateFee);
router.delete("/delete/:ID", verifyToken, deleteFee);

export default router;
