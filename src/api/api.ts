import type { FilterState } from '@/types/types';

export async function fetchData(filters: FilterState) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;

    if (!apiUrl || !apiToken) {
        throw new Error('API URL or token is not defined');
    }
    const queryParams = new URLSearchParams(filters as Record<string, string>).toString();

    const response = await fetch(`${apiUrl}/recruitment/vehicles/list-with-paginate?${queryParams}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) throw new Error('Erro ao buscar dados');

    return response.json();
}
