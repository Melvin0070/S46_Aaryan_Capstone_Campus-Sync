import express from "express";
import * as userController from "../controllers/userController.js";


const router = express.Router();
const { getUserData } = userController;

router.get("/details", getUserData);

export default router;