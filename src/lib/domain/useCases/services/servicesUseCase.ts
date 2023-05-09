import { ServicesRepository } from './../../../infrastructure/repositories/services/servicesRepository';
import { ILocality } from "../../core/entities/localityEntity";
import { LocalityFailure } from "../../core/failures/locality/localityFailure";
import { Service } from '../../core/entities/services/service';
import { ServiceFailure } from '../../core/failures/service/serviceFailure';

export default class ServicesUseCase {
    private _repository: ServicesRepository = new ServicesRepository();
    
    async getServices(): Promise<Array<Service>> {
        try {
            const response = await this._repository.getServices();
  
            if (response instanceof ServiceFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getService(): Promise<Service> {
        try {
            const response = await this._repository.getService();
  
            if (response instanceof ServiceFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }
}