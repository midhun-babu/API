import * as orderService from "../services/orderService.js";
import { sendOrderConfirmationEmail } from "../services/mailService.js";
import { getCartByID } from "../dbqueries/cartQueries.js";
import { findProductById } from "../dbqueries/productQueries.js";
import { getUserById } from "../dbqueries/userQueries.js";
import { getDefaultAddress } from "../dbqueries/addressQueries.js";
import { clearCart } from "../dbqueries/cartQueries.js"; 
import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await getCartByID(userId);
    if (!cart || !cart.products || cart.products.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const address = await getDefaultAddress(userId);
    if (!address) {
      return res.status(400).json({ 
        message: "Shipping address required. Please add a default address first." 
      });
    }

    const orderItems = cart.products.map(p => ({
      product: p.productid,
      quantity: p.quantity,
      price: p.price
    }));

    const order = await orderService.placeOrderService(
      userId, 
      orderItems, 
      cart.totalPrice, 
      address
    );

    await clearCart(userId);

    const user = await getUserById(userId);
    if (user?.email) {
      const html = `<h2>Order Confirmed!</h2>
                    <p>Order ID: ${order._id}</p>
                    <p>Shipping to: ${address.addressLine1}, ${address.city}</p>
                    <p>Total: $${order.total}</p>`;
      await sendOrderConfirmationEmail(user.email, "Your Order Details", html);
    }

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartId, productId, quantity } = req.query;
    
    const address = await getDefaultAddress(userId);
    let itemsData = [];
    let totalValue = 0;

    if (cartId) {
      const cart = await getCartByID(cartId);
      if (!cart) return res.status(404).json({ message: "Cart not found" });
      itemsData = cart.products.map(p => ({
        product: p.productid,
        quantity: p.quantity,
        price: p.price
      }));
      totalValue = cart.totalPrice;
    } else if (productId) {
      const product = await findProductById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });
      const qty = Number(quantity) || 1;
      itemsData = [{ product: product._id, quantity: qty, price: product.price }];
      totalValue = product.price * qty;
    }

    res.json({ 
      summary: {
        items: itemsData,
        total: totalValue,
        shippingAddress: address || "No address found."
      } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await orderService.getUserOrdersService(req.user.id);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderService.getAllOrdersService();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};
