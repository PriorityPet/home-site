import HomeUseCase from '@/lib/domain/useCases/home/homeUseCase';
import { ILocality } from '../../../../lib/domain/core/entities/localityEntity';
import { Dispatch } from "react";
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist';
import ServicesUseCase from '@/lib/domain/useCases/services/servicesUseCase';
import { Service } from '@/lib/domain/core/entities/services/service';

export interface IServicesActions {
  getServices: Function;
}

const getServices = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SERVICES_LOADING" });
    
    const res: Array<Service> = await new ServicesUseCase().getServices();

    dispatch({ type: "GET_SERVICES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SERVICES_ERROR", payload: { error: error } });
  }
}

export const actions: IServicesActions = {
  getServices
}
