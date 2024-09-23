import express from "express";
import * as studentController from "../controllers/studentController.js";
import { verifyToken } from '../controllers/jwtMiddleware.js';
import  apiLimiter  from '../middleware/rateLimiter.js';

const router = express.Router();
const { getStudentData, createStudent, updateStudent, deleteStudent } = studentController;

router.get("/details/:ID", verifyToken, getStudentData);
router.post("/create", apiLimiter, verifyToken, createStudent);
router.put("/update/:ID", apiLimiter, verifyToken, updateStudent);
router.delete("/delete/:ID", apiLimiter, verifyToken, deleteStudent);

export default router;
