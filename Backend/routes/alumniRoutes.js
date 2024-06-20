import express from "express";
import * as alumniController from "../controllers/alumniController.js";
import { verifyToken } from '../controllers/jwtMiddleware.js';

const router = express.Router();
const { getAlumniData, createAlumni, updateAlumni, deleteAlumni } = alumniController;

router.get("/details", verifyToken, getAlumniData);
router.post("/create", verifyToken, createAlumni);
router.put("/update/:id", verifyToken, updateAlumni);
router.delete("/delete/:id", verifyToken, deleteAlumni);

export default router;
