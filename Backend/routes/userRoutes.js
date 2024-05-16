import express from "express";
import * as userController from "../controllers/userController.js";


const router = express.Router();
const { getUserData, createUser, loginUser, deleteUser } = userController;

router.get("/details/:id", getUserData);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.delete("/delete/:id", deleteUser);

export default router;