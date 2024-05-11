import express from "express";
import * as commentController from "../controllers/commentController.js";


const router = express.Router();
const { getCommentData, createComment, updateComment, deleteComment } = commentController;

router.get("/details", getCommentData);
router.post("/create", createComment);
router.put("/update/:id", updateComment);
router.delete("/delete/:id", deleteComment);

export default router;