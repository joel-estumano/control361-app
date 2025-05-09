import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar', () => {
    test('O componente Navbar deve ser criado', () => {
        const { container } = render(<Navbar />);
        expect(container).toBeTruthy();
    });

    const name = 'Joel Estumano';
    test(`O componente Navbar deve exibir o texto de nome e sobrenome ${name}`, () => {
        render(<Navbar />);
        const titleElement = screen.getByText(name);
        expect(titleElement).toBeInTheDocument();
    });
});
