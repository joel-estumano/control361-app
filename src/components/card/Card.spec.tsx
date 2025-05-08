import { render } from '@testing-library/react';
import { Card } from './Card';

test('O componente Card deve ser criado', () => {
    const { container } = render(<Card>Teste</Card>);
    expect(container).toBeTruthy();
});
