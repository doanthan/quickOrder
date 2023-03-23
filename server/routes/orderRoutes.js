import express from "express";
import { admin, protectRoute } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  deleteOrder,
  setDelivered,
} from "../controllers/order.js";

const orderRoutes = express.Router();

orderRoutes.route("/").post(createOrder);
orderRoutes.route("/:id").delete(protectRoute, admin, deleteOrder);
orderRoutes.route("/:id").put(protectRoute, admin, setDelivered);
orderRoutes.route("/").get(protectRoute, admin, getOrders);

export default orderRoutes;
