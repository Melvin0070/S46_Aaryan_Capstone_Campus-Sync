import express from "express";
import * as alumniController from "../controllers/alumniController.js";


const router = express.Router();
const { getAlumniData, createAlumni } = alumniController;

router.get("/details", getAlumniData);
router.post("/create", createAlumni);

export default router;