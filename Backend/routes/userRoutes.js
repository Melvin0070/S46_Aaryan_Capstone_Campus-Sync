import express from "express";
import * as userController from "../controllers/userController.js";


const router = express.Router();
const { getUserData, createUser, loginUser } = userController;

router.get("/details", getUserData);
router.get("/signup", createUser);
router.get("/login", loginUser);

export default router;