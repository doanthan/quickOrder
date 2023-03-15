import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./slices/products";
import cart from "./slices/cart";
import order from "./slices/order";
import user from "./slices/user";

const reducer = combineReducers({ products, cart, order, user });

export default configureStore({ reducer });
