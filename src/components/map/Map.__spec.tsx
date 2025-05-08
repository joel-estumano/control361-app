import { render } from '@testing-library/react';
import { Map } from './Map';

describe('Map', () => {
    test('O componente Map deve ser criado', () => {
        const { container } = render(<Map />);
        expect(container).toBeTruthy();
    });
});
