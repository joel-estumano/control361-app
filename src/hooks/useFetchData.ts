import { useQuery } from '@tanstack/react-query';
import type { DataResponse, FilterState } from '@/types/types';

/**
 * 🚀 Função para buscar dados da API com base nos filtros fornecidos
 * @param {FilterState} filters - Parâmetros de filtro para a consulta
 * @returns {Promise<DataResponse>} - Retorna os dados da API
 */
async function fetchFromAPI(filters: FilterState): Promise<DataResponse> {
    const apiUrl = import.meta.env.VITE_API_URL; // 🔥 Obtém a URL da API do ambiente (.env)
    const apiToken = import.meta.env.VITE_API_TOKEN; // 🔐 Obtém o token da API do ambiente (.env)

    // 🔍 Verifica se os valores estão definidos para evitar chamadas inválidas
    if (!apiUrl || !apiToken) {
        throw new Error('API URL ou token não definidos'); // ⚠️ Dispara um erro caso faltem configurações
    }

    // 🎯 Converte os filtros em parâmetros de consulta para a URL
    const queryParams = new URLSearchParams(filters as Record<string, string>).toString();

    // 🛠️ Faz a requisição para a API com os parâmetros necessários
    const response = await fetch(`${apiUrl}/recruitment/vehicles/list-with-paginate?${queryParams}`, {
        method: 'GET', // 🚀 Método GET para buscar dados
        headers: {
            Authorization: `Bearer ${apiToken}`, // 🔐 Adiciona autenticação no cabeçalho
            'Content-Type': 'application/json',
        },
    });

    // ⚠️ Caso a resposta não seja bem-sucedida, captura o erro e lança uma mensagem específica
    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || `Erro ${response.status}: ${response.statusText}`);
    }

    // 📡 Converte a resposta em JSON e adiciona um timestamp (`fetchedAt`)
    const data = await response.json();
    return {
        ...data,
        fetchedAt: new Date().toISOString(), // ⏳ Adiciona um campo para saber quando os dados foram buscados
    };
}

/**
 * 🏆 Hook personalizado que busca dados da API utilizando React Query
 * @param {FilterState} filters - Parâmetros de filtro da consulta
 * @returns {Object} - Retorna a query do React Query
 */
export function useFetchData(filters: FilterState) {
    // ⏳ Define o tempo de "expiração" dos dados antes de precisar de um novo fetch
    const staleTime = 1000 * 60 * import.meta.env.VITE_TIME_IN_SECONDS_FOR_AUTOMATIC_UPDATE;

    return useQuery({
        queryKey: ['vehicles', filters], // 🔑 Define a chave única para identificar a query
        queryFn: () => fetchFromAPI(filters), // 📡 Função que busca os dados
        staleTime: staleTime, // ⏳ Define o tempo que os dados podem ser considerados "frescos" antes do refetch
    });
}
