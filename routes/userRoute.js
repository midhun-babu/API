import express from "express";
import * as userController from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; 
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", verifyToken, userController.editUser);
router.delete("/:id", verifyToken, userController.deleteUser);

export default router;
