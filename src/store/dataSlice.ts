import { createSlice } from '@reduxjs/toolkit';
import type { DataResponse, VehicleFull } from '@/types/types';
import type { RootState } from './store';

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
        updateData(state, action) {
            state.isLoading = false;
            state.error = null;
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
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
            if (state.isLoading) {
                state.error = null;
            }
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const selectVehicleByPlate = (state: RootState, plate: string): VehicleFull | undefined => {
    const vehicles = state.data.data.content.vehicles || [];
    const locationVehicles = state.data.data.content.locationVehicles || [];

    const vehicle = vehicles.find((v) => v.plate === plate);
    const locationVehicle = locationVehicles.find((v) => v.plate === plate);

    if (!vehicle && !locationVehicle) return undefined;

    return {
        ...vehicle,
        ...locationVehicle,
    } as VehicleFull;
};

export const { resetData, updateData, setLoading, setError } = dataSlice.actions;
export default dataSlice.reducer;
