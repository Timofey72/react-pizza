import { TCartItem } from '../redux/cart/types';

export const getDataFromLS = (): { items: TCartItem[] | []; totalPrice: number } => {
  const data = localStorage.getItem('items');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};

const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
