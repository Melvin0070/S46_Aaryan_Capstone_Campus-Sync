import express from "express";
import * as studentController from "../controllers/studentController.js";
import { verifyToken } from '../controllers/jwtMiddleware.js';

const router = express.Router();
const { getStudentData, createStudent, updateStudent, deleteStudent } = studentController;

router.get("/details/:ID", verifyToken, getStudentData);
router.post("/create", verifyToken, createStudent);
router.put("/update/:ID", verifyToken, updateStudent);
router.delete("/delete/:ID", verifyToken, deleteStudent);

export default router;
