import express from "express";
import * as reportController from "../controllers/reportController.js";


const router = express.Router();
const { getReportData, createReport, updateSolution } = reportController;

router.get("/details/:ID", getReportData);
router.post("/create", createReport);
router.put("/update/:id", updateSolution);

export default router;