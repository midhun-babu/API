import * as productQueries from "../dbqueries/productQueries.js";

export const addProduct = async (productData) => {
  const existing = await productQueries.getProductByPid(productData.pid);

  if (existing) {
    throw new Error("Product with this PID already exists");
  }

  if (productData.price < 1) {
    throw new Error("Minimum price should be 1");
  }

  if (productData.stock < 1) {
    throw new Error("Minimum 1 product needs to be added");
  }

  return await productQueries.createProduct(productData);
};

export const fetchAllProducts = async ({ page, limit }) => {
  const skip = (page - 1) * limit;

  const products = await productQueries.getAllProductsPaginated(skip, limit);
  const total = await productQueries.getProductsCount();

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    products,
  };
};

export const fetchProductByPid = async (pid) => {
  const product = await productQueries.getProductByPid(pid);
  if (!product) throw new Error("Product not found");
  return product;
};

export const editProduct = async (pid, updateData) => {
  return await productQueries.updateProduct(pid, updateData);
};

export const removeProduct = async (pid) => {
  return await productQueries.softDeleteProduct(pid);
};