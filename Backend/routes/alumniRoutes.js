import express from "express";
import * as alumniController from "../controllers/alumniController.js";
import { verifyToken } from '../controllers/jwtMiddleware.js';
import apiLimiter from '../middleware/rateLimiter.js';

const router = express.Router();
const { getAlumniData, createAlumni, updateAlumni, deleteAlumni } = alumniController;

router.get("/details", verifyToken, getAlumniData);
router.post("/create", apiLimiter, verifyToken, createAlumni); 
router.put("/update/:id", apiLimiter, verifyToken, updateAlumni); 
router.delete("/delete/:id", apiLimiter, verifyToken, deleteAlumni)

export default router;
