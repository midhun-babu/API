import express from "express";
import { placeOrder, getOrderSummary, getUserOrders, getAllOrdersController } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/place", verifyToken, placeOrder);
router.get("/summary/:id", verifyToken, getOrderSummary);
router.get("/myorders", verifyToken, getUserOrders);
router.get("/all", verifyToken, getAllOrdersController); // For admin use

export default router;
