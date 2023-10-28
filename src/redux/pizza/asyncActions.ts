import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { PizzaItem, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, category, sort, order, search } = params;
    const res = await axios.get<PizzaItem[]>(
      `https://65200797906e276284c3eccc.mockapi.io/items?page=${currentPage}&limit=8${category}${sort}${order}${search}`,
    );
    return res.data;
  },
);
