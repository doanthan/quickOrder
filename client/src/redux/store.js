import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./slices/products";
import cart from "./slices/cart";
import order from "./slices/order";

const reducer = combineReducers({ products, cart, order });

export default configureStore({ reducer });
