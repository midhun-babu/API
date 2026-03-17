import * as cartService from "../services/cartService.js";

export const addItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = req.user.id;
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: "Invalid product" });
    }

    const cart = await cartService.addToCart(userId, productId, quantity);

    res.status(201).json({
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";
    res.status(statusCode).json({ message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await cartService.removeFromCart(req.user.id, productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearCart(req.user.id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
