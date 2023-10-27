import { ILocality } from "@/lib/domain/core/entities/localityEntity";
import { IService } from "@/lib/domain/core/entities/serviceEntity";
import { Specialist } from "@/lib/domain/core/entities/specialists/specialist";
import { LocalityFailure } from "@/lib/domain/core/failures/locality/localityFailure";
import { PetFailure } from "@/lib/domain/core/failures/pet/petFailure";
import { SpecieFailure } from "@/lib/domain/core/failures/specie/specieFailures";
import { IGetBreedsResponses } from "@/lib/domain/core/response/breedResponses";
import { ICreatePetResponse } from "@/lib/domain/core/response/petResponse";
import { IGetSpeciesResponses } from "@/lib/domain/core/response/specieResponses";


export interface ISpecialistsState {
  getSpecialists: ISpecialistsSpecialistsState;
  getSpecialist: IGetSpecialistState;
  getSpecialistLocalities: ISpecialistsSpecialistsState;
  getSpecialistServices: ISpecialistsSpecialistsState;
  getAttentionWindowsByService: ISpecialistsSpecialistsState;
  createAppointment: ISpecialistsSpecialistsState;
  createUser: ISpecialistsSpecialistsState;
  changeStep: ISpecialistsSpecialistsState;
  changeService: IChangeServiceState;
  changeLocality: IChangeLocalityState;
  changeHourSelected: ISpecialistsSpecialistsState;
  changeUserId: ISpecialistsSpecialistsState;
  changeAppointmentData: ISpecialistsSpecialistsState;
  createPet: IPetCreateState;
  species: IGetSpeciesState;
  breeds: IGetBreedsState;
  getInitialDate: ISpecialistsSpecialistsState;
}

interface ISpecialistsSpecialistsState {
  data: any;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

interface IGetSpecialistState {
  data: Specialist;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

interface IChangeServiceState {
  data: IService | null;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

interface IChangeLocalityState {
  data: ILocality | null;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

interface IPetCreateState {
  data: ICreatePetResponse;
  loading: boolean;
  successful: boolean;
  error: PetFailure | null;
}

interface IGetSpeciesState {
  data: IGetSpeciesResponses;
  loading: boolean;
  successful: boolean;
  error: SpecieFailure | null;
}

interface IGetBreedsState {
  data: IGetBreedsResponses;
  loading: boolean;
  successful: boolean;
  error: SpecieFailure | null;
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
  createAppointment: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
  createUser: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
  changeStep: {
    data: 0,
    loading: false,
    successful: false,
    error: null,
  },
  changeService: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
  changeLocality: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
  changeHourSelected: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
  changeUserId: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  changeAppointmentData: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  },
  createPet: {
    data: {} as ICreatePetResponse,
    loading: false,
    successful: false,
    error: null,
  },
  species: {
      data: {} as IGetSpeciesResponses,
      loading: false,
      successful: false,
      error: null,
  },
  breeds: {
      data: {} as IGetBreedsResponses,
      loading: false,
      successful: false,
      error: null,
  },
  getInitialDate: {
    data: "",
    loading: false,
    successful: false,
    error: null,
  },
}