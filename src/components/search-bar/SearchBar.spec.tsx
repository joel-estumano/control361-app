import { render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('@/store/filterSlice', () => ({
    setFilter: jest.fn(),
    setType: jest.fn(),
}));

jest.mock('@/store/dataSlice', () => ({
    resetData: jest.fn(),
}));

jest.mock('@/context/BreakpointContext', () => ({
    useBreakpoint: jest.fn(),
}));

const mockUseSelector = jest.requireMock('react-redux').useSelector;
const mockUseDispatch = jest.requireMock('react-redux').useDispatch;

const mockUseBreakpoint = jest.requireMock('@/context/BreakpointContext').useBreakpoint;

describe('SearchBar', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        mockUseSelector.mockReturnValue({ isLoading: false, type: 'tracked', filter: '' });
        mockUseDispatch.mockReturnValue(jest.fn());
        mockUseBreakpoint.mockReturnValue({ isMobile: false });
    });

    test('O componente SearchBar deve ser criado', () => {
        const { container } = render(<SearchBar />);
        expect(container).toBeTruthy();
    });

    test('O input de busca deve estar presente', () => {
        render(<SearchBar />);
        const searchInput = screen.getByTestId('search');
        expect(searchInput).toBeInTheDocument();
    });

    test('O input de busca deve ter o placeholder esperado', () => {
        render(<SearchBar />);
        const searchInput = screen.getByTestId('search');
        expect(searchInput).toHaveAttribute('placeholder', 'Buscar por placa ou frota');
    });

    test('O grupo de radio buttons deve estar presente e possuir os labels esperados', () => {
        render(<SearchBar />);

        const radioGroup = screen.getByTestId('radio-group');
        expect(radioGroup).toBeInTheDocument();

        expect(screen.getByLabelText('Rastreados')).toBeInTheDocument();
        expect(screen.getByLabelText('Outros')).toBeInTheDocument();
    });

    test('O input e os radio buttons devem estar desativados quando isLoading for verdadeiro', () => {
        mockUseSelector.mockReturnValue({ isLoading: true });

        render(<SearchBar />);
        const searchInput = screen.getByTestId('search');
        expect(searchInput).toBeDisabled();

        const radioButtons = screen.getAllByRole('radio');
        radioButtons.forEach((radio) => {
            expect(radio).toBeDisabled();
        });
    });

    test("O botão 'Novo' deve aparecer quando não é mobile", () => {
        render(<SearchBar />);
        const newButton = screen.getByTestId('new');
        expect(newButton).toBeInTheDocument();
    });

    test("O botão 'Novo' NÃO deve aparecer quando é mobile", () => {
        mockUseBreakpoint.mockReturnValue({ isMobile: true });
        render(<SearchBar />);
        const newButton = screen.queryByTestId('new');
        expect(newButton).toBeNull();
    });
});
