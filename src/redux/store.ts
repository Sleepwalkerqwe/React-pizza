import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filterReducer from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filterReducer,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
