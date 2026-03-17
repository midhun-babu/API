import Product from "../models/productModel.js";

// Add new product
export const createProduct = async (productData) => {
  return await Product.create(productData);
};

// Find all products 
export const getAllProducts = async () => {
  return await Product.find({ is_deleted: false });
};

//findBYid
export const findProductById = async (productId) => {
  return await Product.findOne({_id:productId ,is_deleted:false}); 
};


// Find a single product by its custom pid
export const getProductByPid = async (pid) => {
  return await Product.findOne({ pid, is_deleted: false });
};

// Update a product by pid
export const updateProduct = async (pid, updateData) => {
  return await Product.findOneAndUpdate({ pid }, updateData, { new: true });
};

// Soft delete a product
export const softDeleteProduct = async (pid) => {
  return await Product.findOneAndUpdate({ pid }, { is_deleted: true }, { new: true });
};

//hard delete a product
export const hardDeleteProduct = async(pid)=>{
  return await Product.findOneAndDelete({pid});
}