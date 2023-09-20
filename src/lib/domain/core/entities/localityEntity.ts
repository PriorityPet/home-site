export interface ILocality {
    id: number;
    name: string;
    code: string;
    type: string;
    //clues: string;
    address: IAdressPeru;
    is_public: boolean;
    is_virtual: boolean;
    image_url: string;
    latitude: number;
    longitude: number;
}

export interface ILocalityService {
    id: number,
    service_id: number;
    location_id: number;
    price: number;
    service_parent_id?: number | null;
}

export interface IAdressPeru {
    department: string;
    province: string;
    district: string;
    city: string;
    street: string;
    reference: string;
    postal_code: string;
}

interface IState {
    id: number;
    name: string;
}