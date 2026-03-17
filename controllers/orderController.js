import { createOrder, getOrderById, getOrdersByUser, getAllOrders } from "../dbqueries/orderQueries.js";

export const placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const user = req.user.id;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items to order" });
    }
    const order = await createOrder({ user, items, total });
    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderSummary = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getOrdersByUser(userId);
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
