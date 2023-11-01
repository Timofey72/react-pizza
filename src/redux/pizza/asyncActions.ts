import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { PizzaData, SearchPizzaParams } from './types';
import { API_URL } from '../../App';

export const fetchPizzas = createAsyncThunk<PizzaData, SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, category, ordering, search } = params;
    const res = await axios.get<PizzaData>(
      `${API_URL}?page=${currentPage}${category}${ordering}${search}`,
    );
    return res.data;
  },
);
