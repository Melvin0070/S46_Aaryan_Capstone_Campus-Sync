import express from "express";
import * as reportController from "../controllers/reportController.js";


const router = express.Router();
const { getReportData } = reportController;

router.get("/details", getReportData);

export default router;