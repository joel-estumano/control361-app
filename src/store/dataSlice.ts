import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { DataResponse, Vehicle, VehicleFull, VehicleLocation } from '@/types/types';
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

            const newVehicles = action.payload.content.vehicles || [];
            const existingVehicles = state.data?.content?.vehicles || [];

            const mergedVehicles = [...existingVehicles, ...newVehicles]
                .reduce((acc, vehicle: Vehicle) => {
                    acc.set(vehicle.id, vehicle); // Substitui ou adiciona o veículo
                    return acc;
                }, new Map())
                .values();

            const newLocations = action.payload.content.locationVehicle || [];
            const existingLocations = state.data?.content?.locationVehicles || [];

            const mergedLocations = [...existingLocations, ...newLocations]
                .reduce((acc, location: VehicleLocation) => {
                    acc.set(location.id, location); // Substitui ou adiciona a localização
                    return acc;
                }, new Map())
                .values();

            state.data = {
                ...action.payload,
                content: {
                    ...action.payload.content,
                    vehicles: Array.from(mergedVehicles),
                    locationVehicle: Array.from(mergedLocations),
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

export const selectVehicleByPlate = createSelector(
    [
        (state: RootState) => state.data.data.content.vehicles || [],
        (state: RootState) => state.data.data.content.locationVehicles || [],
        (_, plate: string) => plate,
    ],
    (vehicles, locationVehicles, plate): VehicleFull | undefined => {
        const vehicle = vehicles.find((v) => v.plate === plate);
        const locationVehicle = locationVehicles.find((v) => v.plate === plate);

        if (!vehicle && !locationVehicle) return undefined;
        if (!vehicle) return locationVehicle as VehicleFull;
        if (!locationVehicle) return vehicle;

        return vehicle || locationVehicle ? ({ ...vehicle, ...locationVehicle } as VehicleFull) : undefined;
    }
);

export const selectPagesLoaded = (state: RootState) => state.data.data.content.page;

export const { resetData, updateData, setLoading, setError } = dataSlice.actions;
export default dataSlice.reducer;
