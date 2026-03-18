import Cart from "../models/cartModel.js";
export const getCartByUserId = async (userId) => {
  return await Cart.findOne({ 
    userid: userId, 
    active: true 
  });
};

export const getCarts = async () => {
  return await Cart.find({}).populate("products.productid"); 
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

export const clearCart = async (userId) => {
  return await Cart.findOneAndUpdate(
    { userid: userId },
    { 
      $set: { 
        products: [], 
        totalPrice: 0 
      } 
    },
    { new: true } 
  );
};