import * as productService from "../services/productService.js";

export const createProduct = async (req, res) => {
  try {
    const product = await productService.addProduct(req.body);
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await productService.fetchAllProducts({
      page: parseInt(page),
      limit: parseInt(limit),
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.fetchProductByPid(req.params.pid);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await productService.removeProduct(req.params.pid);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product soft-deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    const product = await productService.editProduct(
      req.params.pid,
      req.body
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};