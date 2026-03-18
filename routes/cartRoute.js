import express from "express";
import {
  addItem,
  getAllCart,
  getCart,
  removeItem,
  clearCart
} from "../controllers/cartController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.post("/add/:productId", addItem);
router.get("/my", getCart);
router.get("/", authorizeRoles("admin"), getAllCart);
router.delete("/remove/:productId", removeItem);
router.delete("/clear", clearCart);

export default router;