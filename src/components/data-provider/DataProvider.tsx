import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { updateData, setLoading, setError, selectPagesLoaded } from '@/store/dataSlice';
import { useFetchData } from '@/hooks/useFetchData';
import type { FilterState } from '@/types/types';

/**
 * 🚀 Componente `DataProvider`
 * Responsável por buscar dados da API e armazená-los no Redux, além de disparar
 * atualizações automáticas das páginas já carregadas.
 *
 * @param {FilterState} filters - Filtros aplicados para busca de veículos.
 */
export function DataProvider({ filters }: { filters: FilterState }) {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    // 🔥 Obtém o número da última página carregada no Redux
    const pagesLoaded = useSelector(selectPagesLoaded);

    // 📡 Chama a API para buscar dados filtrados
    const { data, isLoading, error } = useFetchData(filters);

    /**
     * 🔄 Atualiza Redux com os dados obtidos da API.
     * Sempre que `data`, `isLoading` ou `error` mudam, o Redux é atualizado.
     */
    useEffect(() => {
        dispatch(setLoading(isLoading)); // 🔥 Atualiza estado de carregamento

        if (error) dispatch(setError(error.message)); // ⚠️ Captura erros da API

        if (data) {
            console.log('🚀 Atualizando Redux Store...');
            dispatch(updateData(data)); // 💾 Armazena os dados carregados no Redux
        }
    }, [data, isLoading, error, dispatch]);

    /**
     * ⏳ Atualiza automaticamente todas as páginas carregadas no Redux.
     * A cada intervalo definido (`VITE_TIME_IN_SECONDS_FOR_AUTOMATIC_UPDATE`), ele refaz as consultas.
     */
    useEffect(() => {
        const interval = setInterval(
            () => {
                const pagesToUpdate = Array.from({ length: pagesLoaded }, (_, i) => i + 1); // 🔢 Gera lista de páginas carregadas

                pagesToUpdate.forEach((page) => {
                    console.log(`🔄 Atualizando página ${page}...`);
                    queryClient.invalidateQueries({ queryKey: ['vehicles'] }); // 🚀 Marca as queries como desatualizadas
                });
            },
            1000 * import.meta.env.VITE_TIME_IN_SECONDS_FOR_AUTOMATIC_UPDATE
        ); // ⏳ Intervalo de atualização automática

        return () => clearInterval(interval); // 🔥 Limpa o intervalo ao desmontar o componente
    }, [queryClient, pagesLoaded]);

    return null; // ✅ Este componente não renderiza nada diretamente
}
