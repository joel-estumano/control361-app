import type { FilterState } from '@/types/types';
import { updateData, setLoading, setError } from '@/store/dataSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useFetchData } from '@/hooks/useFetchData';

export function DataProvider({ filters }: { filters: FilterState }) {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useFetchData(filters);

    useEffect(() => {
        dispatch(setLoading(isLoading));
        if (error) dispatch(setError(error.message));
        if (data) dispatch(updateData(data));
    }, [data, isLoading, error, dispatch]);

    return null;
}
