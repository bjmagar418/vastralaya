import userController from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/",userController.createUser);

router.get("/", userController.getAllUsers);

router.post("/:id", userController.getUserById);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);


export default router;
