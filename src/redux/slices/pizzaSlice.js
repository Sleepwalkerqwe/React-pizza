import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { category, sortBy, order, search, currentPage } = params;
  const url = new URL(`https://67dc1e101fd9e43fe47746ea.mockapi.io/items?page=${currentPage}&limit=4`);

  url.searchParams.append('category', category);
  url.searchParams.append('sortBy', sortBy);
  url.searchParams.append('order', order);

  url.searchParams.append('title', search); // search parameter search = search | title = search

  const { data } = await axios.get(url);
  console.log(data);

  return data;
});

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
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
      state.status = 'loading';
      // action is inferred correctly here if using TS
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
      // action is inferred correctly here if using TS
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = 'error';
      // action is inferred correctly here if using TS
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
