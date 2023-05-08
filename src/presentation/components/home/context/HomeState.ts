import { ILocality } from "@/lib/domain/core/entities/localityEntity";
import { LocalityFailure } from "@/lib/domain/core/failures/locality/localityFailure";


export interface IHomeState {
  getMedicalCenters: IHomeHomeState;
}

interface IHomeHomeState {
  data: Array<ILocality> | string | ILocality;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

export const initialState: IHomeState = {
  getMedicalCenters: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  }
}