import express from "express";
import * as orderControl from "../controllers/orderController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("Place Order:", orderControl.placeOrder);
console.log("Summary:", orderControl.getOrderSummary);
console.log("Update Status:", orderControl.updateOrderStatus);

router.use(verifyToken);

router.post("/place", orderControl.placeOrder);

router.get("/summary", orderControl.getOrderSummary);

router.get("/myorders", orderControl.getUserOrders);

router.get("/all", authorizeRoles('admin'), orderControl.getAllOrdersController);

router.patch("/status/:orderId", authorizeRoles('admin'), orderControl.updateOrderStatus);

export default router;
