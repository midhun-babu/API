import express from "express";
import { addItem,getAllCart ,getCart, removeItem, clearCart } from "../controllers/cartController.js";
import {verifyToken,authorizeRoles} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add/:id",verifyToken, addItem);
router.get("/:id", verifyToken,getCart);
router.get("/",verifyToken,authorizeRoles('admin'),getAllCart);
router.delete("/remove/:id",verifyToken,removeItem);
router.delete("/clear", verifyToken,clearCart);

export default router;



