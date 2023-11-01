export type TCartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  size: number;
  type: string;
  count: number;
};

export interface CartSliceState {
  items: TCartItem[];
  totalPrice: number;
}
