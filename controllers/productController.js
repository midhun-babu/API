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
    const products = await productService.fetchAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.fetchProductByPid(req.params.pid);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productService.removeProduct(req.params.pid);
    res.status(200).json({ message: "Product soft-deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editProduct= async (req,res)=>{
  try{
    await productService.editProduct(req.params.pid);
    res.status(200).json({message:"Product updated successfully"}); 
  }catch(error){
    res.status(500).json({error:error.message})
  }
};