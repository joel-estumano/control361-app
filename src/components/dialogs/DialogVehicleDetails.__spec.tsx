import { render, screen } from '@testing-library/react';
import { DialogVehicleDetails } from './DialogVehicleDetails';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

jest.mock('@/store/dataSlice', () => ({
    selectVehicleByPlate: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
    cn: jest.fn(),
    formatDate: jest.fn(() => '01/01/2023 - 12:00'),
}));

const mockUseSelector = jest.requireMock('react-redux').useSelector;
const mockSelectVehicleByPlate = jest.requireMock('@/store/dataSlice').selectVehicleByPlate;

const mockVehicle = {
    plate: 'XYZ123',
    fleet: 'Frota A',
    type: 'SUV',
    model: 'X1',
    status: 'Ativo',
    name: 'Veículo Teste',
    nameOwner: 'João Silva',
    createdAt: '2025-04-17T17:14:06.947Z',
    ignition: 'Ligado',
    lat: -23.55052,
    lng: -46.633308,
};

describe('DialogVehicleDetails', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('O componente DialogVehicleDetails deve ser criado', () => {
        const { container } = render(<DialogVehicleDetails plate="XYZ123" isOpen={true} setIsOpen={jest.fn()} />);
        expect(container).toBeTruthy();
    });

    test('Debugando valores do veículo', () => {
        mockUseSelector.mockReturnValue(mockVehicle);
        mockSelectVehicleByPlate.mockReturnValue(mockVehicle);

        render(<DialogVehicleDetails plate="XYZ123" isOpen={true} setIsOpen={jest.fn()} />);

        console.log('Valor real de vehicle dentro do teste:', screen.getByTestId('placa').textContent);
    });

    test('Deve exibir os detalhes do veículo corretamente', () => {
        mockUseSelector.mockReturnValue({
            data: { content: { vehicles: [mockVehicle] } },
        });

        mockSelectVehicleByPlate.mockReturnValue(mockVehicle);

        render(<DialogVehicleDetails plate="XYZ123" isOpen={true} setIsOpen={jest.fn()} />);

        expect(screen.getByTestId('placa')).toHaveTextContent(mockVehicle.plate);
        expect(screen.getByTestId('frota')).toHaveTextContent(mockVehicle.fleet);
        expect(screen.getByTestId('tipo')).toHaveTextContent(mockVehicle.type);
        expect(screen.getByTestId('modelo')).toHaveTextContent(mockVehicle.model);
        expect(screen.getByTestId('status')).toHaveTextContent(mockVehicle.status);
        expect(screen.getByTestId('nome')).toHaveTextContent(mockVehicle.name);
        expect(screen.getByTestId('proprietario')).toHaveTextContent(mockVehicle.nameOwner);
        expect(screen.getByTestId('registradoem')).toHaveTextContent('01/01/2023 - 12:00');
        expect(screen.getByTestId('ignicao')).toHaveTextContent(mockVehicle.ignition);

        const mapLink = screen.getByTestId('localizacao');
        expect(mapLink).toHaveAttribute('href', `https://www.google.com/maps?q=${mockVehicle.lat},${mockVehicle.lng}`);
    });
});
