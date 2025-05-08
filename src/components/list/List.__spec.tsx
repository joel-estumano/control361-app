import { render } from '@testing-library/react';
import { List } from './List';

test('O componente List deve ser criado', () => {
    const { container } = render(<List />);
    expect(container).toBeTruthy();
});
