import express from 'express';
import multer from 'multer';
import * as dropController from "../controllers/dropController.js";
import { verifyToken } from '../controllers/jwtMiddleware.js';
import  apiLimiter  from '../middleware/rateLimiter.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const { createDrop, getAllDrop, deleteDrop } = dropController;

router.post('/upload', apiLimiter, verifyToken, upload.single('file'), createDrop);
router.get('/files', verifyToken, getAllDrop);
router.delete('/files/:id', verifyToken, deleteDrop);

export default router;
