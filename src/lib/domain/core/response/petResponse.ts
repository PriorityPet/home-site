import { IPet } from "../entities/petEntity";

export interface IGetPetsResponse {
    data: IPet[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface IGetPetResponse {
    data: IPet;
    metadata: {}
}

export interface ICreatePetResponse {
    data: IPet;
    metadata: {}
}

export interface IEditPetResponse {
    data: IPet;
    metadata: {}
}
