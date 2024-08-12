import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      state.cart.push(item);
    },
    removeItem(state, action) {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item?.product?._id !== itemId);
    },
    clearCart(state) {
      state.cart = [];
    },
    updateItem(state, action) {
      const { quantity, product } = action.payload;
      const item = state.cart.find(
        (item) => item?.product?._id === product?._id
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    updateCartItems(state, action) {
      state.cart = action.payload;
    },
  },
});

export const { addItem, removeItem, updateItem, clearCart, updateCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;

export const updateCartServer = async (cartItems, userId) => {
  try {
    await axios.put(`http://localhost:4040/api/carts/user-cart`, {
      user: userId,
      cartItems,
    });
  } catch (error) {
    alert(`Error: ${error?.response?.data?.error || error?.message}`);
  }
};
