import { RootState } from '../store';

export const selectOrdering = (state: RootState) => state.filter.ordering;
export const selectFilter = (state: RootState) => state.filter;
export const selectSearchValue = (state: RootState) => state.filter.searchValue;
