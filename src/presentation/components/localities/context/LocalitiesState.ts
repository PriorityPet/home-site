import { ILocality } from "@/lib/domain/core/entities/localityEntity";
import { LocalityFailure } from "@/lib/domain/core/failures/locality/localityFailure";


export interface ILocalitiesState {
  getMedicalCenters: ILocalitiesLocalitiesState;
}

interface ILocalitiesLocalitiesState {
  data: Array<ILocality> | string | ILocality;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

export const initialState: ILocalitiesState = {
  getMedicalCenters: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  }
}