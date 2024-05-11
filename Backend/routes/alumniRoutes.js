import express from "express";
import * as alumniController from "../controllers/alumniController.js";


const router = express.Router();
const { getAlumniData, createAlumni, updateAlumni, deleteAlumni } = alumniController;

router.get("/details", getAlumniData);
router.post("/create", createAlumni);
router.put("/update/:id", updateAlumni);
router.delete("/delete/:id", deleteAlumni);

export default router;