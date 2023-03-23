import express from "express";
import { protectRoute, admin } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProduct,
  createNewProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.js";

const productRoutes = express.Router();

productRoutes.route("/").get(getProducts);
productRoutes.route("/:id").get(getProduct);
productRoutes.route("/").put(protectRoute, admin, updateProduct);
productRoutes.route("/:id").delete(protectRoute, admin, deleteProduct);
productRoutes.route("/").post(protectRoute, admin, createNewProduct);

export default productRoutes;
