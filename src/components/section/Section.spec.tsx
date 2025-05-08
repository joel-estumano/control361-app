import { render } from '@testing-library/react';
import { Section } from './Section';

test('O componente Section deve ser criado', () => {
    const { container } = render(<Section>Teste</Section>);
    expect(container).toBeTruthy();
});
