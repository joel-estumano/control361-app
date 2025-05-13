import type { DataResponse } from '@/types/types';
import { Map } from './Map';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
    useSelector: jest.fn()
}));

const mockSelector = (data: Partial<DataResponse>) => {
    (useSelector as unknown as jest.Mock).mockImplementation((callback) => callback({
        data: {
            content: {
                page: data.content?.page ?? 1,
                perPage: data.content?.perPage ?? '10',
                totalPages: data.content?.totalPages ?? 1,
                vehicles: data.content?.vehicles ?? [],
                locationVehicles: data.content?.locationVehicles ?? [],
            },
            message: data.message ?? 'Success',
            statusCode: data.statusCode ?? '200',
        }
    }));
};

describe('Map', () => {
    beforeEach(() => {
        mockSelector({
            content: {
                page: 1,
                perPage: '10',
                totalPages: 1,
                vehicles: [],
                locationVehicles: [
                    {
                        plate: 'XYZ-1234',
                        lat: -23.5505,
                        lng: -46.6333,
                        fleet: 'Frota A',
                        createdAt: '',
                        equipmentId: '',
                        id: '',
                        ignition: '',
                        name: '',
                        pin: ''
                    }
                ]
            },
            message: 'Success',
            statusCode: '200'
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('O componente Map deve ser criado', () => {
        const { container } = render(<Map />);
        expect(container).toBeTruthy();
    });
});
