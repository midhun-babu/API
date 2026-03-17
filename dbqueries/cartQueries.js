import Cart from "../models/cartModel.js";
export const getCartByUserId = async (userId) => {
  return await Cart.findOne({ 
    userid: userId, 
    active: true 
  });
};


export const getCartByID = async (userId) => {
  return await Cart.findOne({ 
    userid: userId, 
    active: true 
  }).populate("products.productid");  
};

 
export const updateCart = async (userId, updateData) => {
  return await Cart.findOneAndUpdate(
    { userid: userId, active: true },
    updateData,
    { new: true } 
  );
};
 
export const deleteCart = async (userId) => {
  return await Cart.findOneAndUpdate(
    { userid: userId }, 
    { active: false }, 
    { new: true }
  );
};
