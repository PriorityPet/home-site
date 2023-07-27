import { ServicesRepository } from './../../../infrastructure/repositories/services/servicesRepository';
import { ILocality } from "../../core/entities/localityEntity";
import { LocalityFailure } from "../../core/failures/locality/localityFailure";
import { Service } from '../../core/entities/services/service';
import { ServiceFailure } from '../../core/failures/service/serviceFailure';
import { Specialist } from '../../core/entities/specialists/specialist';
import { SpecialistsRepository } from '@/lib/infrastructure/repositories/specialists/specialistsRepository';
import { SpecialistsFailure } from '../../core/failures/specialists/specialistsFailure';

export default class SpecialistsUseCase {
    private _repository: SpecialistsRepository = new SpecialistsRepository();
    
    async getSpecialists(): Promise<Array<Specialist>> {
        try {
            const response = await this._repository.getSpecialists();
  
            if (response instanceof SpecialistsFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getSpecialist(id:number): Promise<Specialist> {
        try {
            const response = await this._repository.getSpecialist(id);
  
            if (response instanceof SpecialistsFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getSpecialistLocalities(id:number): Promise<any[]> {
        try {
            const response = await this._repository.getSpecialistLocalities(id);
  
            if (response instanceof SpecialistsFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getSpecialistServices(id:number, localityId?:number): Promise<any[]> {
        try {
            const response = await this._repository.getSpecialistServices(id, localityId);
  
            if (response instanceof SpecialistsFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getAttentionWindowsByService(id:number, date:string): Promise<any[]> {
        try {
            const response = await this._repository.getAttentionWindowsByService(id, date);
  
            if (response instanceof SpecialistsFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }
    async createAppointment(obj:any): Promise<any> {
        try {
            const response = await this._repository.createAppointment(obj);
  
            if (response instanceof SpecialistsFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }
}