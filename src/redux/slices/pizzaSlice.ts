import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { SortPropertyEnum } from './filterSlice';

export type PizzasItemParams = { category: string; sortBy: string; order: string; search: string; currentPage: number };
// type PizzasItemParams = Record<string, string>;

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: PizzasItemParams) => {
  const { category, sortBy, order, search, currentPage } = params;
  const url = new URL(`https://67dc1e101fd9e43fe47746ea.mockapi.io/items?page=${currentPage}&limit=4`);

  url.searchParams.append('category', category);
  url.searchParams.append('sortBy', sortBy);
  url.searchParams.append('order', order);

  url.searchParams.append('title', search); // search parameter search = search | title = search

  const { data } = await axios.get<PizzaItem[]>(`${url}`);

  return data as PizzaItem[];
});

export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

export const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
