import { render, screen } from '@testing-library/react';
import { Section } from './Section';
import type { JSX } from 'react';

describe('Section', () => {
    let mockChildren: JSX.Element;

    beforeEach(() => {
        jest.resetAllMocks();
        mockChildren = <p>Conteúdo interno</p>;
    });

    test('O componente Section deve ser criado', () => {
        const { container } = render(<Section>{mockChildren}</Section>);
        expect(container).toBeTruthy();
    });

    test('Os children devem ser renderizados corretamente dentro do componente', () => {
        render(<Section>{mockChildren}</Section>);
        expect(screen.getByText('Conteúdo interno')).toBeInTheDocument();
    });

    test('O componente deve renderizar a estrutura correta', () => {
        const { container } = render(<Section>{mockChildren}</Section>);
        const sectionElement = container.querySelector('section');
        const innerDiv = container.querySelector('div');

        expect(sectionElement).toBeInTheDocument();
        expect(innerDiv).toBeInTheDocument();
    });

    test('A classe adicional deve ser aplicada corretamente', () => {
        const { container } = render(<Section className="custom-class">{mockChildren}</Section>);
        expect(container.querySelector('div')).toHaveClass('custom-class');
    });
});
