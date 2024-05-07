import express from "express";
import * as alumniController from "../controllers/alumniController.js";


const router = express.Router();
const { getAlumniData, createAlumni, updateAlumni } = alumniController;

router.get("/details", getAlumniData);
router.post("/create", createAlumni);
router.put("/update/:id", updateAlumni);

export default router;