import express from "express";
import * as userController from "../controllers/userController.js";


const router = express.Router();
const { getUserData, createUser, loginUser, updateUser, deleteUser } = userController;

router.get("/details", getUserData);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;