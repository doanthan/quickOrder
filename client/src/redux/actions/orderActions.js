import axios from "axios";
import { setError, shippingAddressAdd, clearOrder } from "../slices/order";

export const setShippingAddress = (data) => (dispatch) => {
  dispatch(shippingAddressAdd(data));
};

export const setShippingAddressError = (value) => (dispatch) => {
  dispatch(setError(value));
};

export const createOrder = (order) => async (dispatch, getState) => {
  const {
    order: { shippingAddress },
  } = getState();

  const preparedOrder = { ...order, shippingAddress };
  try {
    const { data } = await axios.post("api/orders", preparedOrder);
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

export const resetOrder = () => async (dispatch) => {
  dispatch(clearOrder());
};
