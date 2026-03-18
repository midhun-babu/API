import Order from "../models/orderModel.js";

export const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

export const getOrderById = async (orderId) => {
  return await Order.findById(orderId).populate("user").populate("items.product");
};

export const getOrdersByUser = async (userId) => {
  return await Order.find({ user: userId }).populate("items.product");
};

export const getAllOrders = async () => {
  return await Order.find().populate("user").populate("items.product");
};
