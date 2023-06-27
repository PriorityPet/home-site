import { ILocality } from "@/lib/domain/core/entities/localityEntity";
import { Specialist } from "@/lib/domain/core/entities/specialists/specialist";
import { LocalityFailure } from "@/lib/domain/core/failures/locality/localityFailure";


export interface ISpecialistsState {
  getSpecialists: ISpecialistsSpecialistsState;
  getSpecialist: ISpecialistsSpecialistsState;
  getSpecialistLocalities: ISpecialistsSpecialistsState;
  getSpecialistServices: ISpecialistsSpecialistsState;
  getAttentionWindowsByService: ISpecialistsSpecialistsState;
}

interface ISpecialistsSpecialistsState {
  data: any;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

export const initialState: ISpecialistsState = {
  getSpecialists: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getSpecialist: {
    data: {} as Specialist,
    loading: false,
    successful: false,
    error: null,
  },
  getSpecialistLocalities: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getSpecialistServices: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getAttentionWindowsByService: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
}