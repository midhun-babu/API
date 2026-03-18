import Cart from "../models/cartModel.js";

export const getCartByUserId = async (userId, populate = false) => {
  if (!userId) throw { statusCode: 401, message: "Unauthorized" };
  
  const query = Cart.findOne({ userid: userId, active: true });
  if (populate) query.populate("products.productid");
  
  return await query;
};

export const getCarts = async () => {
  return await Cart.find({}).populate("products.productid");
};

export const updateCart = async (userId, updateData) => {
  if (!userId) throw { statusCode: 401, message: "Unauthorized" };
  
  return await Cart.findOneAndUpdate(
    { userid: userId, active: true },
    updateData,
    { new: true }
  );
};

export const deleteCart = async (userId) => {
  if (!userId) throw { statusCode: 401, message: "Unauthorized" };
  
  return await Cart.findOneAndUpdate(
    { userid: userId },
    { active: false },
    { new: true }
  );
};

export const clearCart = async (userId) => {
  if (!userId) throw { statusCode: 401, message: "Unauthorized" };
  
  return await Cart.findOneAndUpdate(
    { userid: userId, active: true },
    { $set: { products: [], totalPrice: 0 } },
    { new: true }
  );
};