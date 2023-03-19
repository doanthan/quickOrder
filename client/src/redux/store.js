import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./slices/products";
import cart from "./slices/cart";
import order from "./slices/order";
import user from "./slices/user";
import admin from "./slices/admin";

const reducer = combineReducers({ products, cart, order, user, admin });

export default configureStore({ reducer });
