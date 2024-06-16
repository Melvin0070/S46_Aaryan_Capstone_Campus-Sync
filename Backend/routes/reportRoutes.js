import express from "express";
import * as reportController from "../controllers/reportController.js";
import { verifyToken } from '../controllers/jwtMiddleware.js';

const router = express.Router();
const { getReportData, createReport, updateSolution } = reportController;

router.get("/details/:ID", verifyToken, getReportData);
router.post("/create", verifyToken, createReport);
router.put("/update/:id", verifyToken, updateSolution);

export default router;
