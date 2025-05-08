import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import dataReducer from './dataSlice';

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        data: dataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
