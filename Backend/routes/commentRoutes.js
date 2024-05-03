import express from "express";
import * as commentController from "../controllers/commentController.js";


const router = express.Router();
const { getCommentData } = commentController;

router.get("/details", getCommentData);

export default router;