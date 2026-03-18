import Product from "../models/productModel.js";

export const createProduct = async (productData) => {
  return await Product.create(productData);
};

export const getAllProducts = async () => {
  return await Product.find({ is_deleted: false });
};

export const getAllProductsPaginated = async (skip, limit) => {
  return await Product.find({ is_deleted: false })
    .skip(skip)
    .limit(limit);
};

export const getProductsCount = async () => {
  return await Product.countDocuments({ is_deleted: false });
};

export const findProductById = async (productId) => {
  return await Product.findOne({ _id: productId, is_deleted: false });
};

export const getProductByPid = async (pid) => {
  return await Product.findOne({ pid, is_deleted: false });
};

export const updateProduct = async (pid, updateData) => {
  return await Product.findOneAndUpdate(
    { pid, is_deleted: false },
    updateData,
    { new: true }
  );
};

export const softDeleteProduct = async (pid) => {
  return await Product.findOneAndUpdate(
    { pid, is_deleted: false },
    { is_deleted: true },
    { new: true }
  );
};

export const hardDeleteProduct = async (pid) => {
  return await Product.findOneAndDelete({ pid });
};