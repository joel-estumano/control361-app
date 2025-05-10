import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

const mockUseSelector = jest.requireMock('react-redux').useSelector;

describe('Navbar', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('O componente Navbar deve ser criado', () => {
        mockUseSelector.mockReturnValue({ isLoading: false });

        const { container } = render(<Navbar />);
        expect(container).toBeTruthy();
    });

    test('O componente Navbar deve exibir o nome e sobrenome', () => {
        mockUseSelector.mockReturnValue({ isLoading: false });

        render(<Navbar />);

        const nameElement = screen.getByTestId('name');
        expect(nameElement).toHaveTextContent('Joel Estumano');
    });

    test('A barra de progresso deve aparecer quando isLoading for verdadeiro', () => {
        mockUseSelector.mockReturnValueOnce({ isLoading: true });

        render(<Navbar />);

        const progressBar = screen.getByTestId('progress');
        expect(progressBar).not.toHaveClass('hidden');
    });
});
