import express from "express";
import * as commentController from "../controllers/commentController.js";
import { verifyToken } from '../controllers/jwtMiddleware.js';

const router = express.Router();
const { getCommentData, createComment, updateLikes, deleteComment } = commentController;

router.get("/details", verifyToken, getCommentData);
router.post("/create", verifyToken, createComment);
router.put("/update/:id", verifyToken, updateLikes);
router.delete("/delete/:id", verifyToken, deleteComment);

export default router;
