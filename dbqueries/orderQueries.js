import Order from "../models/orderModel.js";
import mongoose from "mongoose";

export const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

export const getOrderById = async (orderId) => {
  const objectId = new mongoose.Types.ObjectId(orderId);

  const result = await Order.aggregate([
    { $match: { _id: objectId } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails"
      }
    },
    { $unwind: "$userDetails" },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    {
      $addFields: {
        items: {
          $map: {
            input: "$items",
            as: "item",
            in: {
              product: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$productDetails",
                      as: "pd",
                      cond: { $eq: ["$$pd._id", "$$item.product"] }
                    }
                  },
                  0
                ]
              },
              quantity: "$$item.quantity",
              price: "$$item.price",
              subtotal: { $multiply: ["$$item.quantity", "$$item.price"] }
            }
          }
        }
      }
    },
    { $project: { productDetails: 0 } }
  ]);

  return result[0];
};

export const getOrdersByUser = async (userId) => {
  const objectId = new mongoose.Types.ObjectId(userId);

  const results = await Order.aggregate([
    { $match: { user: objectId } },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    {
      $addFields: {
        items: {
          $map: {
            input: "$items",
            as: "item",
            in: {
              product: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$productDetails",
                      as: "pd",
                      cond: { $eq: ["$$pd._id", "$$item.product"] }
                    }
                  },
                  0
                ]
              },
              quantity: "$$item.quantity",
              price: "$$item.price",
              subtotal: { $multiply: ["$$item.quantity", "$$item.price"] }
            }
          }
        }
      }
    },
    { $project: { productDetails: 0 } },
    { $sort: { createdAt: -1 } }
  ]);

  return results;
};

export const getAllOrders = async () => {
  const results = await Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails"
      }
    },
    { $unwind: "$userDetails" },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    {
      $addFields: {
        items: {
          $map: {
            input: "$items",
            as: "item",
            in: {
              product: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$productDetails",
                      as: "pd",
                      cond: { $eq: ["$$pd._id", "$$item.product"] }
                    }
                  },
                  0
                ]
              },
              quantity: "$$item.quantity",
              price: "$$item.price",
              subtotal: { $multiply: ["$$item.quantity", "$$item.price"] }
            }
          }
        }
      }
    },
    { $project: { productDetails: 0 } },
    { $sort: { createdAt: -1 } }
  ]);

  return results;
};