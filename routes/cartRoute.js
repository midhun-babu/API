import express from "express";
import { addItem, getCart, removeItem, clearCart } from "../controllers/cartController.js";
import * as auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add/:id",auth.verifyToken, addItem);
router.get("/:id", getCart);
router.delete("/remove/:productId", removeItem);
router.delete("/clear", clearCart);

export default router;



