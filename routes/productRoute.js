import express from "express";
import * as productController from "../controllers/productController.js";
import { verifyToken,authorizeRoles } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/", verifyToken,authorizeRoles('admin'), productController.createProduct); 
router.get("/", productController.getProducts);               
router.get("/:pid", productController.getProductById);       
router.delete("/:pid", verifyToken, productController.deleteProduct); 
router.post("/update/:pid",verifyToken,authorizeRoles('admin'),productController.editProduct);


export default router;
