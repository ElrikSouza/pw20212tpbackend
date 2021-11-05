import { Router } from "express";
import { jwtMiddleware } from "../jwt/jwt-middleware.js";
import { ProductsController } from "./products-controller.js";

export const ProductsModule = Router();

ProductsModule.post(
  "/products",
  jwtMiddleware,
  ProductsController.createProduct
)
  .delete("/products/:id", jwtMiddleware, ProductsController.deleteProduct)
  .get("/products/:id", ProductsController.getOneProduct)
  .get("/products", ProductsController.getAllProducts)
  .put("/products/:id", upload, jwtMiddleware, ProductsController.editProduct);
