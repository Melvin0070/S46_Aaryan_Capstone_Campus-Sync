import express from "express";
import * as userController from "../controllers/userController.js";


const router = express.Router();
const { createUser, loginUser, deleteUser } = userController;

router.post("/signup", createUser);
router.get("/login/:ID", loginUser);
router.delete("/delete/:ID", deleteUser);

export default router;