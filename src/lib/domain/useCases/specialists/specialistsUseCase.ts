import { ServicesRepository } from './../../../infrastructure/repositories/services/servicesRepository';
import { ILocality } from "../../core/entities/localityEntity";
import { LocalityFailure } from "../../core/failures/locality/localityFailure";
import { Service } from '../../core/entities/services/service';
import { ServiceFailure } from '../../core/failures/service/serviceFailure';
import { Specialist } from '../../core/entities/specialists/specialist';
import { SpecialistsRepository } from '@/lib/infrastructure/repositories/specialists/specialistsRepository';
import { SpecialistsFailure } from '../../core/failures/specialists/specialistsFailure';
import { SpecialistEnum } from '@/lib/enums/specialist/specialistEnum';
import { EmailRepository } from '@/lib/infrastructure/repositories/email/emailRepository';

export default class SpecialistsUseCase {
    private _repository: SpecialistsRepository = new SpecialistsRepository();
    private _emailRepository: EmailRepository = new EmailRepository()
    
    async getSpecialists(): Promise<Array<Specialist>> {
        try {
            const response = await this._repository.getSpecialists();
  
            if (response instanceof SpecialistsFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getSpecialist(id:number, type: string | number): Promise<Specialist> {
        try {
            const response = await this._repository.getSpecialist(id, type);
  
            if (response instanceof SpecialistsFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getSpecialistLocalities(id:number, type:number, country: string): Promise<ILocality[]> {
        try {
            if(type === SpecialistEnum.PQA){
                const response = await this._repository.getPQALocalities(id);
      
                if (response instanceof SpecialistsFailure) throw response;
      
                return response;
            }

            const response = await this._repository.getSpecialistLocalities(id, type, country);
  
            if (response instanceof SpecialistsFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getSpecialistServices(id:number, type:number, localityId:number): Promise<any[]> {
        try {

            if(type === SpecialistEnum.PROVIDER){
                let response = await this._repository.getProviderServices(id, localityId);
                if (response instanceof SpecialistsFailure) throw response;
  
                return response;
            }

            if(type === SpecialistEnum.PQA){
                let response = await this._repository.getPQAServices(id, localityId);
                if (response instanceof SpecialistsFailure) throw response;
  
                return response;
            }

            let response = await this._repository.getSpecialistServices(id, localityId);

            if (response instanceof SpecialistsFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getAttentionWindowsByService(obj:{userId:number; serviceId:number; date:string; type: number}): Promise<any[]> {
        try {
            if(obj.type === SpecialistEnum.PQA){
                const response = await this._repository.getAttentionWindowsByServicePQA(obj);
  
                if (response instanceof SpecialistsFailure) throw response;
    
                return response;
            }

            const response = await this._repository.getAttentionWindowsByService(obj.serviceId, obj.date);
  
            if (response instanceof SpecialistsFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getInitialDate(obj:{userId:number; serviceId:number; date:string; type: number}): Promise<string> {
        try {
            if(obj.type === SpecialistEnum.PQA){
                const response = await this._repository.getInitialDatePQA(obj);
  
                if (response instanceof SpecialistsFailure) throw response;
    
                return response[0].fechaInicio;
            }

            const response = await this._repository.getInitialDate(obj.serviceId, obj.date);
  
            if (response instanceof SpecialistsFailure) throw response;
  
            return response[0].fechaInicio;
        } catch (error) {
            throw error;
        }
    }
    
    async createAppointment(obj:any): Promise<any> {
        try {
            const response = await this._repository.createAppointment(obj);
  
            if (response instanceof SpecialistsFailure) throw response;

            await this._emailRepository.sendAppointmentEmail({
                owner: obj["paciente"], 
                user: obj["doctor"], 
                date: obj["date"], 
                serviceName: obj["nombreServicio"], 
                address: obj["direccion"],
                hour: obj["hour"],
            })
  
            return response;
        } catch (error) {
            throw error;
        }
    }
}