import { Service } from '@/lib/domain/core/entities/services/service';
import { GET_SERVICES_ENDPOINT } from '../../config/api/dictionary';
import nookies from 'nookies';
import { ServiceFailure, serviceFailuresEnum } from '@/lib/domain/core/failures/service/serviceFailure';

export default interface IServicesRepository {
    getServices(): Promise<Array<Service> | ServiceFailure>;
}

export class ServicesRepository implements IServicesRepository {
  async getServices(): Promise<Array<Service> | ServiceFailure> {
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
  
      let URL = GET_SERVICES_ENDPOINT as RequestInfo
  
      const response = await fetch(URL, requestOptions)
      let data = await response.json()
  
      console.log("GET_SERVICES_ENDPOINT", data["data"])
  
      return data["data"] as Array<Service> ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new ServiceFailure(serviceFailuresEnum.serverError);
    }
  }
  async getService(): Promise<Service | ServiceFailure> {
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
  
      let URL = GET_SERVICES_ENDPOINT as RequestInfo
  
      const response = await fetch(URL, requestOptions)
      let data = await response.json()
  
      console.log("GET_SERVICE_ENDPOINT", data["data"])
  
      return data["data"] as Service ?? {};
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new ServiceFailure(serviceFailuresEnum.serverError);
    }
  }
}