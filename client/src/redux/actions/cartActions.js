import axios from "axios";
import {
  setLoading,
  setError,
  cartItemAdd,
  cartItemRemoval,
  setExpressShipping,
  clearCart,
} from "../slices/cart";

export const addCartItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    console.log(data);
    const itemToAdd = {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      stripePriceId: data.stripePriceId,
      stripeProductId: data.stripeProductId,
      storeId: data.storeId,
      slug: data.slug,
      qty,
    };
    dispatch(cartItemAdd(itemToAdd));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const removeCartItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(cartItemRemoval(id));
};

export const setExpress = (value) => async (dispatch) => {
  dispatch(setExpressShipping(value));
};

export const resetCart = (slug) => (dispatch) => {
  dispatch(clearCart(slug));
};
