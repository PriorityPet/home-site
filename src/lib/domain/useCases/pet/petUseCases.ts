import IOwnerRepository, { OwnerRepository } from "@/lib/infrastructure/repositories/owner/ownerRepository";
import { PetRepository } from "@/lib/infrastructure/repositories/pet/petRepository";
import { IPet } from "../../core/entities/petEntity";
import { ICreatePetResponse } from "../../core/response/petResponse";
import { OwnerFailure, ownerFailuresEnum } from "../../core/failures/owner/ownerFailure";
import { PetFailure, petFailuresEnum } from "../../core/failures/pet/petFailure";
import { IGetSpeciesResponses } from "../../core/response/specieResponses";
import { SpecieFailure } from "../../core/failures/specie/specieFailures";
import { IGetBreedsResponses } from "../../core/response/breedResponses";
import { BreedFailure } from "../../core/failures/breed/breedFailures";

export default class PetUseCase {
  private _repository: PetRepository = new PetRepository();
  private _ownerRepository: IOwnerRepository = new OwnerRepository();

  async createPet(obj: { pet: IPet, providerId: number|null, doctorId: number|null }): Promise<ICreatePetResponse> {
    try {
      console.log(obj)
      if (obj.pet.owner && obj.pet.owner.id === 0) {
        const res = await this._ownerRepository.createOwner({ owner: obj.pet.owner });

        if (res instanceof OwnerFailure) {
          throw new OwnerFailure(ownerFailuresEnum.alreadyExists);
        }

        obj.pet.ownerId = res.data.id;
        obj.pet.owner.subjectId = res.data.subjectId;
      }

      const response = await this._repository.createPet({ pet: obj.pet });

      if (response instanceof PetFailure) throw response;

      const typeUser = 1;

      await this._repository.createSubjectRelation({subjectId:response.data.subjectId, userId: obj.doctorId, typeUser: typeUser, providerId: obj.providerId});
      await this._repository.createSubjectRelation({subjectId:obj.pet.ownerId, userId: obj.doctorId, typeUser: typeUser, providerId: obj.providerId});

      return response
    } catch (error) {
      throw error;
    }
  }

  async getSpecies(): Promise<IGetSpeciesResponses> {
    try {
      const response = await this._repository.getSpecies({ });

      if (response instanceof SpecieFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getBreeds(obj: { specieId?: number | null }): Promise<IGetBreedsResponses> {
    try {
      const response = await this._repository.getBreeds({ specieId: obj.specieId });

      if (response instanceof BreedFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
