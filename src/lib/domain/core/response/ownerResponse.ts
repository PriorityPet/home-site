import { IOwner } from "../entities/ownerEntity";

export interface IGetOwnersResponse {
    data: IOwner[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface IGetOwnerResponse {
    data: IOwner;
    metadata: {}
}

export interface ICreateOwnerResponse {
    data: IOwner;
    metadata: {}
}

export interface IEditOwnerResponse {
    data: IOwner;
    metadata: {}
}
