import * as orderQueries from "../dbqueries/orderQueries.js";

export const placeOrderService = async (userId, items, total, address) => {
  if (!items || items.length === 0) {
    throw { statusCode: 400, message: "No items to order" };
  }

  const orderData = {
    user: userId,
    items,
    total,
    shippingAddress: {
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country || ""
    },
    paymentStatus: "pending",
    deliveryStatus: "pending"
  };

  return await orderQueries.createOrder(orderData);
};

export const getOrderSummaryService = async (orderId) => {
  const order = await orderQueries.getOrderById(orderId);
  if (!order) throw { statusCode: 404, message: "Order not found" };
  return order;
};

export const getUserOrdersService = async (userId) => {
  const orders = await orderQueries.getOrdersByUser(userId);
  return orders;
};

export const getAllOrdersService = async () => {
  const orders = await orderQueries.getAllOrders();
  return orders;
};