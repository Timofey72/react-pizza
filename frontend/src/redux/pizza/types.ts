export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
};

export type PizzaData = {
  pizzas: PizzaItem[];
  count_page: number;
}

export type SearchPizzaParams = {
  currentPage: number;
  category: string;
  ordering: string;
  search: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  count_page: number,
  status: Status;
}
