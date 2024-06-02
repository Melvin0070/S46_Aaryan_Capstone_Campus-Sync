import express from 'express';
import multer from 'multer';
import * as dropController from "../controllers/dropController.js";


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const { createDrop, getAllDrop, deleteDrop } = dropController;

router.post('/upload', upload.single('file'), createDrop);
router.get('/files', getAllDrop);
router.delete('/files/:id', deleteDrop);

export default router;
