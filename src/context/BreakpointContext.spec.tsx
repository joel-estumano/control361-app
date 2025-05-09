import { render } from '@testing-library/react';
import { BreakpointProvider, useBreakpoint } from './BreakpointContext';

const TestComponent = () => {
    const { isMobile } = useBreakpoint();
    return <p>Breakpoint: {isMobile ? 'Mobile' : 'Desktop'}</p>;
};

describe('BreakpointContext', () => {
    test("Deve exibir 'Mobile' quando a largura da tela for menor ou igual a 768px", () => {
        global.innerWidth = 600; // Simula um dispositivo móvel
        const { container } = render(
            <BreakpointProvider>
                <TestComponent />
            </BreakpointProvider>
        );
        expect(container.textContent).toContain('Mobile');
    });

    test("Deve exibir 'Desktop' quando a largura da tela for maior que 768px", () => {
        global.innerWidth = 1024; // Simula um desktop
        const { container } = render(
            <BreakpointProvider>
                <TestComponent />
            </BreakpointProvider>
        );
        expect(container.textContent).toContain('Desktop');
    });

    test('Deve lançar erro se useBreakpoint for chamado fora do provider', () => {
        const renderComponentWithoutProvider = () => render(<TestComponent />);
        expect(renderComponentWithoutProvider).toThrowError('useBreakpoint must be used within a BreakpointProvider');
    });
});
