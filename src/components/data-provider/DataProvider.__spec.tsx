import { render } from '@testing-library/react';
import { DataProvider } from './DataProvider';
import { updateData, setLoading, setError } from '@/store/dataSlice';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
    useQueryClient: jest.fn(),
}));

jest.mock('@/hooks/useFetchData', () => ({
    useFetchData: jest.fn(),
}));

jest.mock('@/store/dataSlice', () => ({
    updateData: jest.fn(),
    setLoading: jest.fn(),
    setError: jest.fn(),
    selectPagesLoaded: jest.fn(),
}));

const mockUseDispatch = jest.requireMock('react-redux').useDispatch;
const mockUseSelector = jest.requireMock('react-redux').useSelector;
const mockUseQueryClient = jest.requireMock('@tanstack/react-query').useQueryClient;
const mockUseFetchData = jest.requireMock('@/hooks/useFetchData');

describe('DataProvider', () => {
    let mockDispatch: jest.Mock;

    beforeEach(() => {
        jest.resetAllMocks();
        mockDispatch = jest.fn();
        mockUseDispatch.mockReturnValue(mockDispatch);
        mockUseSelector.mockReturnValue(1);
        mockUseQueryClient.mockReturnValue({ invalidateQueries: jest.fn() });
        mockUseFetchData.mockReturnValue({ data: ['Veículo A'], isLoading: false, error: null });
    });

    test('O dispatch deve ser chamado corretamente para atualizar Redux', () => {
        render(<DataProvider filters={{ filter: 'test', type: 'tracked', page: 1, perPage: 10 }} />);
        expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
        expect(mockDispatch).toHaveBeenCalledWith(updateData(['Veículo A']));
    });

    test('O efeito de atualização automática deve invalidar queries corretamente', () => {
        const mockQueryClient = mockUseQueryClient.mockReturnValue({ invalidateQueries: jest.fn() });
        render(<DataProvider filters={{ filter: 'test', type: 'tracked', page: 1, perPage: 10 }} />);
        jest.advanceTimersByTime(1000 * 120);
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['vehicles'] });
    });

    test('O dispatch deve capturar erro corretamente', () => {
        mockUseFetchData.mockReturnValue({ data: null, isLoading: false, error: { message: 'Erro na API' } });
        render(<DataProvider filters={{ filter: 'test', type: 'tracked', page: 1, perPage: 10 }} />);
        expect(mockDispatch).toHaveBeenCalledWith(setError('Erro na API'));
    });
});
