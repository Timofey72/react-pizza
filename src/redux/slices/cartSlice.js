import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice += action.payload.price;
    },
    minusProduct(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem.count === 1) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      } else {
        findItem.count--;
      }
      state.totalPrice -= findItem.price;
    },
    removeProduct(state, action) {
      const product = state.items.find((obj) => obj.id === action.payload);

      state.totalPrice -= product.count * product.price;
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearProducts(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, minusProduct, clearProducts } = cartSlice.actions;

export default cartSlice.reducer;
