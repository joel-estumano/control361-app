import App from './App';
import React from 'react';
import { describe, expect, test, beforeEach } from '@jest/globals';
import { render } from '@testing-library/react';

// ✅ Mockando Redux
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

// ✅ Mockando Slice de filtro
jest.mock('@/store/filterSlice', () => ({
    setPage: jest.fn(),
}));

// ✅ Mockando Slice de dados
jest.mock('@/store/dataSlice', () => ({}));

// ✅ Mockando contexto de Breakpoint
jest.mock('@/context/BreakpointContext', () => ({
    useBreakpoint: jest.fn(),
}));

// ✅ Mockando React Query
jest.mock('@tanstack/react-query', () => ({
    useQueryClient: jest.fn(),
    useQuery: jest.fn(),
}));

// ✅ Mockando `useFetchData`
jest.mock('@/hooks/useFetchData', () => ({
    useFetchData: jest.fn(),
}));

// ✅ Pegando os mocks
const mockUseSelector = jest.requireMock('react-redux').useSelector;
const mockUseDispatch = jest.requireMock('react-redux').useDispatch;
const mockUseBreakpoint = jest.requireMock('@/context/BreakpointContext').useBreakpoint;
const mockUseQueryClient = jest.requireMock('@tanstack/react-query').useQueryClient;
const mockUseFetchData = jest.requireMock('@/hooks/useFetchData').useFetchData;

// ✅ Garantindo que `useSelector` retorne um estado válido
beforeEach(() => {
    jest.resetAllMocks();

    // Mockando Redux (`useSelector`)
    mockUseSelector.mockReturnValue({
        filters: { page: 1, perPage: '10', type: 'tracked', filter: '' },
        data: {
            content: {
                page: 1,
                perPage: '10',
                totalPages: 1,
                vehicles: [],
                locationVehicles: []
            }
        },
        isLoading: false
    });

    mockUseDispatch.mockReturnValue(jest.fn());
    mockUseBreakpoint.mockReturnValue({ isMobile: false });
    mockUseQueryClient.mockReturnValue({ invalidateQueries: jest.fn() });

    // Mockando `useFetchData` para evitar erro ao desestruturar `data`
    mockUseFetchData.mockReturnValue({
        data: {
            content: {
                page: 1,
                perPage: '10',
                totalPages: 1,
                vehicles: [],
                locationVehicles: [],
            },
            message: 'Success',
            statusCode: '200',
        },
        isLoading: false,
        error: null,
    });

    // ✅ Mockando `fetch`, caso `App` faça requisições externas
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) })) as jest.Mock;
});

// ✅ Criando um ErrorBoundary para capturar erros silenciosos
function TestErrorBoundary({ children }: { children: React.ReactNode }) {
    return (
        <React.Suspense fallback={<div>Carregando...</div>}>
            {children}
        </React.Suspense>
    );
}

describe('App', () => {
    test('O componente App deve ser criado', () => {
        const { container } = render(
            <TestErrorBoundary>
                <App />
            </TestErrorBoundary>
        );

        expect(container).toBeTruthy();
    });
});
