import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getDataFromLS } from '../../utils/getDataFromLS';
import { CartSliceState, TCartItem } from './types';

const { items, totalPrice } = getDataFromLS();

const initialState: CartSliceState = {
  items,
  totalPrice,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice += action.payload.price;
    },
    minusProduct(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (!findItem) {
        return;
      }

      findItem.count--;
      state.totalPrice -= findItem.price;
    },
    removeProduct(state, action: PayloadAction<string>) {
      const product = state.items.find((obj) => obj.id === action.payload);

      if (product) {
        state.totalPrice -= product.count * product.price;
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }
    },
    clearProducts(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, minusProduct, clearProducts } = cartSlice.actions;

export default cartSlice.reducer;
