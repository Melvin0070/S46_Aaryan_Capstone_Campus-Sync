import express from "express";
import * as commentController from "../controllers/commentController.js";
import { verifyToken } from '../controllers/jwtMiddleware.js';
import  apiLimiter  from "../middleware/rateLimiter.js";

const router = express.Router();
const { getCommentData, createComment, updateLikes, deleteComment } = commentController;

router.get("/details", verifyToken, getCommentData);
router.post("/create", apiLimiter, verifyToken, createComment);
router.put("/update/:id", apiLimiter, verifyToken, updateLikes);
router.delete("/delete/:id", apiLimiter, verifyToken, deleteComment);

export default router;