import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  PRICE_DESC = 'price',
  TITLE_DESC = 'title',
  RATING_ASC = '-rating',
  PRICE_ASC = '-price',
  TITLE_ASC = '-title',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface filterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}

const initialState: filterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности', sortProperty: SortPropertyEnum.RATING_DESC },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<filterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
      } else {
        state.sort = {
          name: 'популярности',
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
        state.currentPage = 1;
        state.categoryId = 0;
      }
    },
  },
});

export const { setSearchValue, setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
