import { render } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
    test('O componente SearchBar deve ser criado', () => {
        const { container } = render(<SearchBar />);
        expect(container).toBeTruthy();
    });
});
