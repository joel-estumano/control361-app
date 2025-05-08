import type { RootState } from '@/store/store';
import type { DataResponse } from '@/types/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '@/api/api';

export const fetchDataThunk = createAsyncThunk<DataResponse>('data/fetchData', async (_, { getState }) => {
    const state = getState() as RootState;
    const filters = state.filters;
    return await fetchData(filters);
});

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: {
            content: {
                page: 1,
                perPage: '',
                totalPages: 1,
                vehicles: [],
                locationVehicles: [],
            },
            message: '',
            statusCode: '',
        } as DataResponse,
        isLoading: false,
        error: null as string | null,
    },
    reducers: {
        resetData(state) {
            state.data = {
                content: {
                    page: 1,
                    perPage: '',
                    totalPages: 1,
                    vehicles: [],
                    locationVehicles: [],
                },
                message: '',
                statusCode: '',
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDataThunk.fulfilled, (state, action) => {
                state.isLoading = false;

                state.data = {
                    ...action.payload,
                    content: {
                        ...action.payload.content,
                        vehicles:
                            action.payload.content.page === 1
                                ? action.payload.content.vehicles
                                : [...state.data.content.vehicles, ...action.payload.content.vehicles],
                    },
                };
            })
            .addCase(fetchDataThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Erro desconhecido';
            });
    },
});

export const { resetData } = dataSlice.actions;
export default dataSlice.reducer;
