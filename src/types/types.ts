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
