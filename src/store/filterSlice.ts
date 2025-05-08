import type { FilterState, FilterType } from '@/types/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: FilterState = { filter: '', type: 'tracked', page: 1, perPage: 10 };

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload;
        },
        setType(state, action: PayloadAction<FilterType>) {
            state.type = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setPerpage(state, action: PayloadAction<number>) {
            state.perPage = action.payload;
        },
    },
});

export const { setFilter, setType, setPage, setPerpage } = filterSlice.actions;
export default filterSlice.reducer;
