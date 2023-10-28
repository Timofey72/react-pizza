import { RootState } from '../store';
import { TCartItem } from './types';

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: TCartItem) => obj.id === id);
