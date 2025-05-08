export interface DataResponse {
    content: {
        page: number;
        perPage: string;
        totalPages: number;
        vehicles: Vehicle[];
        locationVehicles: VehicleLocation[];
    };
    message: string;
    statusCode: string;
}

export type FilterType = 'tracked' | 'others';

export interface FilterState extends Record<string, unknown> {
    filter: string;
    type: FilterType;
    page: number;
    perPage: number;
}

export interface Vehicle {
    createdAt: string;
    fleet: string;
    id: string;
    model: string;
    nameOwner: string;
    plate: string;
    status: string;
    type: string;
}

export interface VehicleLocation extends Omit<Vehicle, 'model' | 'status' | 'nameOwner' | 'type'> {
    lat: number;
    lng: number;
    equipmentId: string;
    name: string;
    ignition: string;
    pin?: string;
}
