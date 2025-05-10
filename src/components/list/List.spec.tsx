import { render, screen } from '@testing-library/react';
import { List } from './List';
import type { Vehicle } from '@/types/types';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('@/store/dataSlice', () => ({}));

jest.mock('@/context/BreakpointContext', () => ({
    useBreakpoint: jest.fn(),
}));

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}));

const mockUseSelector = jest.requireMock('react-redux').useSelector;
const mockUseDispatch = jest.requireMock('react-redux').useDispatch;

const mockUseBreakpoint = jest.requireMock('@/context/BreakpointContext').useBreakpoint;

describe('List', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        mockUseDispatch.mockReturnValue(jest.fn());
        mockUseBreakpoint.mockReturnValue({ isMobile: false });
        mockUseSelector.mockReturnValue({
            data: {
                content: {
                    vehicles: [{ plate: 'ABC123', fleet: 'A', type: 'SUV', model: 'X1', status: 'Active' } as Vehicle],
                    totalPages: 5,
                },
                isLoading: false,
                error: null,
            },
        });
    });

    test('O componente List deve ser criado ', () => {
        const { container } = render(<List />);
        expect(container).toBeTruthy();
    });

    test('O componente deve renderizar a tabela corretamente no desktop', () => {
        render(<List />);
        const table = screen.getByTestId('vehicle-table');
        expect(table).toBeInTheDocument();
        const tableHeaders = ['Placa', 'Frota', 'Tipo', 'Modelo', 'Status'];
        tableHeaders.forEach((header) => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });
    });

    test('O componente deve renderizar o accordion corretamente no mobile', () => {
        mockUseBreakpoint.mockReturnValue({ isMobile: true });
        render(<List />);
        const accordion = screen.getByTestId('vehicle-accordion');
        expect(accordion).toBeInTheDocument();
        expect(screen.queryByTestId('vehicle-table')).toBeNull();
    });

    test('Deve exibir mensagem quando não há veículos disponíveis', () => {
        mockUseSelector.mockReturnValue({
            data: { content: { vehicles: [] }, isLoading: false, error: null },
        });
        render(<List />);
        expect(screen.getByText('Nenhum registro encontrado!')).toBeInTheDocument();
    });
});
