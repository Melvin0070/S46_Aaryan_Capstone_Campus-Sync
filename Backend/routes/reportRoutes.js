import express from "express";
import * as reportController from "../controllers/reportController.js";


const router = express.Router();
const { getReportData, createReport } = reportController;

router.get("/details", getReportData);
router.post("/create", createReport);

export default router;