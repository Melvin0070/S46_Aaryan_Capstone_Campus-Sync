import express from "express";
import * as alumniController from "../controllers/alumniController.js";


const router = express.Router();
const { getAlumniData } = alumniController;

router.get("/details", getAlumniData);

export default router;