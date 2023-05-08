import { ILocality } from "@/lib/domain/core/entities/localityEntity";
import { Service } from "@/lib/domain/core/entities/services/service";
import { LocalityFailure } from "@/lib/domain/core/failures/locality/localityFailure";


export interface IServicesState {
  getServices: IServicesServicesState;
}

interface IServicesServicesState {
  data: Array<Service> | string | Service;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

export const initialState: IServicesState = {
  getServices: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  }
}