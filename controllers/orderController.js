import * as orderService from "../services/orderService.js";
import { sendOrderConfirmationEmail } from "../services/mailService.js";
import { getCartByUserId } from "../dbqueries/cartQueries.js";
import { getUserById } from "../dbqueries/userQueries.js";
import { getDefaultAddress } from "../dbqueries/addressQueries.js";
import { clearCart } from "../dbqueries/cartQueries.js";
import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const cart = await getCartByUserId(userId, true);
    if (!cart || !cart.products.length) return res.status(400).json({ message: "Your cart is empty" });

    const address = await getDefaultAddress(userId);
    if (!address) return res.status(400).json({ message: "Shipping address required" });

    const orderItems = cart.products.map(p => ({
      product: p.productid._id,
      name: p.productid.name,
      quantity: p.quantity,
      price: p.price,
      subtotal: p.price * p.quantity
    }));

    const totalAmount = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

    const order = await orderService.placeOrderService(userId, orderItems, totalAmount, address);

    await clearCart(userId);

    const user = await getUserById(userId);
    if (user?.email) {
      const orderDate = new Date(order.createdAt).toLocaleString();

      const itemsHtml = orderItems.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>$${item.subtotal.toFixed(2)}</td>
        </tr>
      `).join("");

      const html = `
        <h2>Order Confirmation</h2>
        <p>Hi ${user.name},</p>
        <p>Thank you for your order! Here are your order details:</p>
        <h3>Order ID: ${order._id}</h3>
        <p>Order Date: ${orderDate}</p>
        <p>Payment Status: ${order.paymentStatus || "Pending"}</p>
        <p>Delivery Status: ${order.deliveryStatus || "Pending"}</p>
        <h3>Shipping Address:</h3>
        <p>
          ${address.addressLine1}, ${address.addressLine2 || ""}<br>
          ${address.city}, ${address.state}, ${address.postalCode}<br>
          ${address.country || ""}
        </p>
        <h3>Order Summary:</h3>
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr>
              <td colspan="3" style="text-align:right;"><strong>Total:</strong></td>
              <td><strong>$${totalAmount.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
        <p>We will notify you once your order is shipped.</p>
        <p>Thank you for shopping with us!</p>
      `;

      await sendOrderConfirmationEmail(user.email, `Order Confirmation - ${order._id}`, html);
    }

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
  }
};

export const getOrderSummary = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const cart = await getCartByUserId(userId, true);
    if (!cart || !cart.products.length) return res.status(400).json({ message: "Your cart is empty" });

    const address = await getDefaultAddress(userId);

    const itemsData = cart.products.map(p => ({
      product: p.productid._id,
      name: p.productid.name,
      quantity: p.quantity,
      price: p.price,
      subtotal: p.price * p.quantity
    }));

    const totalValue = itemsData.reduce((sum, item) => sum + item.subtotal, 0);

    res.status(200).json({
      summary: {
        items: itemsData,
        total: totalValue,
        shippingAddress: address || "No address found."
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const orders = await orderService.getUserOrdersService(userId);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderService.getAllOrdersService();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus, deliveryStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus, deliveryStatus },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};