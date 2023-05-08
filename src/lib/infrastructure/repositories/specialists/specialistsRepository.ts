import { GET_SPECIALISTS_ENDPOINT } from '../../config/api/dictionary';
import nookies from 'nookies';
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist';
import { SpecialistsFailure, specialistsFailuresEnum } from '@/lib/domain/core/failures/specialists/specialistsFailure';

export default interface ISpecialistsRepository {
    getSpecialists(): Promise<Array<Specialist> | SpecialistsFailure>;
}

export class SpecialistsRepository implements ISpecialistsRepository {
    async getSpecialists(): Promise<Array<Specialist> | SpecialistsFailure> {
        try {
          let cookies = nookies.get(undefined, 'access_token');
    
          var myHeaders = new Headers();
    
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);
    
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          } as RequestInit;
    
          let URL = GET_SPECIALISTS_ENDPOINT as RequestInfo
    
          const response = await fetch(URL, requestOptions)
          let data = await response.json()
    
          console.log("GET_SPECIALISTS_ENDPOINT", data["data"])
    
          return data["data"] as Array<Specialist> ?? [];
        } catch (error) {
          console.log("Error", error)
          const exception = error as any;
          return new SpecialistsFailure(specialistsFailuresEnum.serverError);
        }
      }
}