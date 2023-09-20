import { IBreed } from "./breedEntity";
import { IOwner } from "./ownerEntity";
import { ISpecie } from "./specieEntity";

export interface IPet {
    id: number;
    subjectId: number;
    name: string;
    chip: string;
    specieId: number;
    specie: ISpecie;
    breedId: number;
    breed: IBreed;
    sex: number;
    ownerId: number;
    owner: IOwner;
    age?: number | null;
    ageType?: string;
    file?: File | null;
    pictureUrl: string;
    birthDate?: Date | null;
    createdAt: Date;
}
