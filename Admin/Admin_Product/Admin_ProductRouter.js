import express from "express";
import Admin_productController from "./Admin_ProductController.js";
const Admin_ProductRouter = express.Router();

Admin_ProductRouter.post("/create", Admin_productController.insertProduct);
Admin_ProductRouter.get("/fetch", Admin_productController.getProduct);
Admin_ProductRouter.get("/delete/:id", Admin_productController.deleteProduct);
Admin_ProductRouter.get("/byid/:id", Admin_productController.getProductById);
Admin_ProductRouter.post("/edit/:id", Admin_productController.editProductDetails);
Admin_ProductRouter.post("/cart", Admin_productController.GetCart);

//product category Api
Admin_ProductRouter.post("/category/create", Admin_productController.createProductCategory);
Admin_ProductRouter.get("/category/get", Admin_productController.getProductCategory);
Admin_ProductRouter.post("/category/delete/:id", Admin_productController.deleteProductCategory);
Admin_ProductRouter.get("/category/find/:id", Admin_productController.findProductCategoryById);
Admin_ProductRouter.put("/category/update/:id", Admin_productController.updateProductCategory);

export default Admin_ProductRouter;
