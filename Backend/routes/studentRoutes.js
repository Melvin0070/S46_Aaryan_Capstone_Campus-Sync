import express from "express";
import * as studentController from "../controllers/studentController.js";


const router = express.Router();
const { getStudentData } = studentController;

router.get("/details", getStudentData);

export default router;