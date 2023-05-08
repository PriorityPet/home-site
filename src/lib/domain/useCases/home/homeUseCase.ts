import { LocalitiesRepository } from "@/lib/infrastructure/repositories/localities/localitiesRepository";
import { ILocality } from "../../core/entities/localityEntity";
import { LocalityFailure } from "../../core/failures/locality/localityFailure";
import { Specialist } from "../../core/entities/specialists/specialist";
import { SpecialistsRepository } from "@/lib/infrastructure/repositories/specialists/specialistsRepository";
import { SpecialistsFailure } from "../../core/failures/specialists/specialistsFailure";

export default class HomeUseCase {
    private _repository: LocalitiesRepository = new LocalitiesRepository();
    private _repositorySpecialists: SpecialistsRepository = new SpecialistsRepository();
    
    async getMedicalCenters(): Promise<Array<ILocality>> {
        try {
            const response = await this._repository.getMedicalCenters();
  
            if (response instanceof LocalityFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getSpecialists(): Promise<Array<Specialist>> {
        try {
            const response = await this._repositorySpecialists.getSpecialists();
  
            if (response instanceof SpecialistsFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }
}