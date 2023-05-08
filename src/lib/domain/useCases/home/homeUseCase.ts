import { LocalitiesRepository } from "@/lib/infrastructure/repositories/localities/localitiesRepository";
import { ILocality } from "../../core/entities/localityEntity";
import { LocalityFailure } from "../../core/failures/locality/localityFailure";

export default class HomeUseCase {
    private _repository: LocalitiesRepository = new LocalitiesRepository();
    
    async getMedicalCenters(): Promise<Array<ILocality>> {
        try {
            const response = await this._repository.getMedicalCenters();
  
            if (response instanceof LocalityFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }
}