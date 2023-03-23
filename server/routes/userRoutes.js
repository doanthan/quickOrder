import express from "express";
import { protectRoute, admin } from "../middleware/authMiddleware.js";
import {
  loginUser,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserOrders,
} from "../controllers/user.js";

const userRoutes = express.Router();

userRoutes.route("/login").post(loginUser);
userRoutes.route("/register").post(registerUser);
userRoutes.route("/profile/:id").put(protectRoute, updateUserProfile);
userRoutes.route("/:id").get(protectRoute, getUserOrders);
userRoutes.route("/").get(protectRoute, admin, getUsers);
userRoutes.route("/:id").delete(protectRoute, admin, deleteUser);

export default userRoutes;
