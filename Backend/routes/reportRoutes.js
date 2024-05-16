import express from "express";
import * as reportController from "../controllers/reportController.js";


const router = express.Router();
const { getReportData, createReport, updateReport, deleteReport } = reportController;

router.get("/details/:ID", getReportData);
router.post("/create", createReport);
router.put("/update/:ID", updateReport);
router.delete("/delete/:ID", deleteReport);

export default router;