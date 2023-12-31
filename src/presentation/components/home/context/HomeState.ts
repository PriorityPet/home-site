import { ILocality } from "@/lib/domain/core/entities/localityEntity";
import { Specialist } from "@/lib/domain/core/entities/specialists/specialist";
import { LocalityFailure } from "@/lib/domain/core/failures/locality/localityFailure";


export interface IHomeState {
  getMedicalCenters: IHomeHomeState;
  getSpecialists: IHomeHomeState;
}

interface IHomeHomeState {
  data: Array<ILocality> | Array<Specialist> | string | ILocality;
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
  },
  getSpecialists: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  }
}