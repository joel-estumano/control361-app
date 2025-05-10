import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import type { JSX } from 'react';

describe('Card', () => {
    let mockChildren: JSX.Element;

    beforeEach(() => {
        jest.resetAllMocks();
        mockChildren = <p>Conteúdo interno</p>;
    });

    test('O componente Card deve ser criado', () => {
        const { container } = render(<Card>{mockChildren}</Card>);
        expect(container).toBeTruthy();
    });

    test('Os children devem ser renderizados corretamente dentro do componente', () => {
        render(<Card>{mockChildren}</Card>);
        expect(screen.getByText('Conteúdo interno')).toBeInTheDocument();
    });

    test('O componente deve conter um elemento estruturado', () => {
        const { container } = render(<Card>{mockChildren}</Card>);
        const cardElement = container.firstChild;
        expect(cardElement).toBeInTheDocument();
    });

    test('A classe adicional deve ser aplicada corretamente', () => {
        const { container } = render(<Card className="custom-class">{mockChildren}</Card>);
        expect(container.firstChild).toHaveClass('custom-class');
    });
});
