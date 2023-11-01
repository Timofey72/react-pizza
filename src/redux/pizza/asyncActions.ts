import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { PizzaData, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<PizzaData, SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, category, ordering, search } = params;
    const res = await axios.get<PizzaData>(
      `http://localhost:8000/api/v1/pizzas?page=${currentPage}${category}${ordering}${search}`,
    );
    return res.data;
  },
);
