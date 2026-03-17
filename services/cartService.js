import * as cartQueries from "../dbqueries/cartQueries.js";
import * as productQueries from "../dbqueries/productQueries.js";
import Cart from "../models/cartModel.js";

export const addToCart = async (userId, productId, quantityInput) => {
  const quantity = Number(quantityInput);
  if (isNaN(quantity) || quantity <= 0) {
    throw { statusCode: 400, message: "Invalid quantity provided" };
  }

  const product = await productQueries.findProductById(productId);
  if (!product) throw { statusCode: 404, message: "Product not found" };

  let cart = await cartQueries.getCartByUserId(userId);

  if (!cart) {
    cart = new Cart({
      userid: userId,
      products: [{ 
        productid: productId, 
        quantity, 
        price: product.price 
      }],
      active: true,
    });
  } else {
    const itemIndex = cart.products.findIndex(
      (p) => p.productid.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({
        productid: productId,
        quantity,
        price: product.price,
      });
    }
  }

  return await cart.save();
};

export const getCart = async (userId) => {
  return await cartQueries.getCartByUserId(userId);
};

export const removeFromCart = async (userId, productId) => {
  const cart = await cartQueries.getCartByUserId(userId);
  if (!cart) return null;

  cart.products = cart.products.filter(
    (p) => p.productid.toString() !== productId.toString()
  );

  return await cart.save();
};

export const clearCart = async (userId) => {
  return await cartQueries.updateCart(userId, { products: [] });
};