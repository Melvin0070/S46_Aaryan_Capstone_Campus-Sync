import express from "express";
import * as reportController from "../controllers/reportController.js";


const router = express.Router();
const { getReportData, createReport, updateReport, deleteReport } = reportController;

router.get("/details", getReportData);
router.post("/create", createReport);
router.put("/update/:id", updateReport);
router.delete("/delete/:id", deleteReport);

export default router;