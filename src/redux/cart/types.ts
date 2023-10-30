export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

export interface CartSliceState {
  items: TCartItem[];
  totalPrice: number;
}