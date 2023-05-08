import { GET_MEDICAL_CENTERS_ENDPOINT } from '../../config/api/dictionary';
import { ILocality } from './../../../domain/core/entities/localityEntity';
import { LocalityFailure, localityFailuresEnum } from './../../../domain/core/failures/locality/localityFailure';
import nookies from 'nookies';

export default interface ILocalitiesRepository {
    getMedicalCenters(): Promise<Array<ILocality> | LocalityFailure>;
}

export class LocalitiesRepository implements ILocalitiesRepository {
    async getMedicalCenters(): Promise<Array<ILocality> | LocalityFailure> {
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
    
          let URL = GET_MEDICAL_CENTERS_ENDPOINT as RequestInfo
    
          const response = await fetch(URL, requestOptions)
          let data = await response.json()
    
          console.log("GET_MEDICAL_CENTERS_ENDPOINT", data["data"])
    
          return data["data"] as Array<ILocality> ?? [];
        } catch (error) {
          console.log("Error", error)
          const exception = error as any;
          return new LocalityFailure(localityFailuresEnum.serverError);
        }
      }
}