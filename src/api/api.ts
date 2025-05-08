import type { DataResponse, FilterState } from '@/types/types';

export async function fetchData(filters: FilterState): Promise<DataResponse> {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;

    if (!apiUrl || !apiToken) {
        throw new Error('API URL ou token não definidos');
    }

    const queryParams = new URLSearchParams(filters as Record<string, string>).toString();

    try {
        const response = await fetch(`${apiUrl}/recruitment/vehicles/list-with-paginate?${queryParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || `Erro ${response.status}: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Erro na busca de dados:', error);
        throw new Error(error instanceof Error ? error.message : 'Erro desconhecido!');
    }
}
