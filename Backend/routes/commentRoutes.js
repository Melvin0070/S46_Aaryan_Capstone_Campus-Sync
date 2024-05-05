import express from "express";
import * as commentController from "../controllers/commentController.js";


const router = express.Router();
const { getCommentData, createComment } = commentController;

router.get("/details", getCommentData);
router.get("/create", createComment);

export default router;