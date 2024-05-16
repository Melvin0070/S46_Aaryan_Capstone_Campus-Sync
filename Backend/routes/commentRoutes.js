import express from "express";
import * as commentController from "../controllers/commentController.js";


const router = express.Router();
const { getCommentData, createComment, updateLikes, deleteComment } = commentController;

router.get("/details", getCommentData);
router.post("/create", createComment);
router.put("/update/:id", updateLikes);
router.delete("/delete/:id", deleteComment);

export default router;