import { ILocality } from '../../../../lib/domain/core/entities/localityEntity';
import { Dispatch } from "react";
import SpecialistsUseCase from '@/lib/domain/useCases/specialists/specialistsUseCase';
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist';
import AuthUseCase from '@/lib/domain/useCases/auth/authUseCase';
import { IPet } from '@/lib/domain/core/entities/petEntity';
import PetUseCase from '@/lib/domain/useCases/pet/petUseCases';
import { IService } from '@/lib/domain/core/entities/serviceEntity';

export interface ISpecialistsActions {
  changeStep: Function;
  getSpecialists: Function;
  getSpecialist: Function;
  getSpecialistLocalities: Function;
  getSpecialistServices: Function;
  getAttentionWindowsByService: Function;
  createAppointment: Function;
  createUser: Function;
  changeService: Function;
  changeLocality: Function;
  changeHourSelected: Function;
  changeUserId: Function;
  changeAppointmentData: Function;
  resetUserCreation: Function
  resetAppointmentCreation: Function;
  createPet: (obj: { pet: IPet, providerId: number|null, doctorId: number|null }) => (dispatch: Dispatch<any>) => {};
  getSpecies: () =>  (dispatch: Dispatch<any>) => {};
  getBreeds: (obj: { specieId: number }) => (dispatch: Dispatch<any>) => {};
}

const getSpecialists = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SPECIALISTS_LOADING" });
    
    const res: Array<Specialist> = await new SpecialistsUseCase().getSpecialists();

    dispatch({ type: "GET_SPECIALISTS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SPECIALISTS_ERROR", payload: { error: error } });
  }
}

const getSpecialist = (id:number, type:number | string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SPECIALIST_LOADING" });
    
    const res: Specialist = await new SpecialistsUseCase().getSpecialist(id, type);

    dispatch({ type: "GET_SPECIALIST_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SPECIALIST_ERROR", payload: { error: error } });
  }
}

const createPet = (obj: { pet: IPet, providerId: number|null, doctorId: number|null }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CREATE_PET_LOADING" });
    
    const res = await new PetUseCase().createPet(obj);

    dispatch({ type: "CREATE_PET_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "CREATE_PET_ERROR", payload: { error: error } });
  }
}

const getSpecies = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SPECIES_LOADING" });
    
    const res = await new PetUseCase().getSpecies();

    dispatch({ type: "GET_SPECIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_SPECIES_ERROR", payload: { error: error } });
  }
}

const getBreeds = (obj: { specieId: number }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_BREEDS_LOADING" });
    
    const res = await new PetUseCase().getBreeds({ specieId: obj.specieId });

    dispatch({ type: "GET_BREEDS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_BREEDS_ERROR", payload: { error: error } });
  }
}

const getSpecialistLocalities = (id:number, type:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SPECIALIST_LOCALITIES_LOADING" });
    
    const res: ILocality[] = await new SpecialistsUseCase().getSpecialistLocalities(id, type);

    dispatch({ type: "GET_SPECIALIST_LOCALITIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SPECIALIST_LOCALITIES_ERROR", payload: { error: error } });
  }
}

const getSpecialistServices = (id:number, type:number, localityId?:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SPECIALIST_SERVICES_LOADING" });
    
    const res: any[] = await new SpecialistsUseCase().getSpecialistServices(id, type, localityId);

    dispatch({ type: "GET_SPECIALIST_SERVICES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SPECIALIST_SERVICES_ERROR", payload: { error: error } });
  }
}

const getAttentionWindowsByService = (id:number, date:string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SERVICE_ATTENTION_WINDOW_LOADING" });
    
    const res: any[] = await new SpecialistsUseCase().getAttentionWindowsByService(id, date);

    dispatch({ type: "GET_SERVICE_ATTENTION_WINDOW_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SERVICE_ATTENTION_WINDOW_ERROR", payload: { error: error } });
  }
}

const createAppointment = (obj:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CREATE_APPOINTMENT_LOADING" });
    
    const res: any = await new SpecialistsUseCase().createAppointment(obj);

    dispatch({ type: "CREATE_APPOINTMENT_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "CREATE_APPOINTMENT_ERROR", payload: { error: error } });
  }
}

const createUser = (obj:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CREATE_USER_LOADING" });
    
    const res: string = await new AuthUseCase().createSubject(obj);

    dispatch({ type: "CREATE_USER_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "CREATE_USER_ERROR", payload: { error: error } });
  }
}

const changeStep = (step:number) => async (dispatch: Dispatch<any>) => dispatch({ type: "CHANGE_STEP_SUCCESSFUL", payload: { data: step } });

const changeService = (data:IService) => async (dispatch: Dispatch<any>) => dispatch({ type: "CHANGE_SERVICE_SUCCESSFUL", payload: { data: data } });

const changeLocality = (data:ILocality) => async (dispatch: Dispatch<any>) => dispatch({ type: "CHANGE_LOCALITY_SUCCESSFUL", payload: { data: data } });

const changeHourSelected = (data:string) => async (dispatch: Dispatch<any>) => dispatch({ type: "CHANGE_HOUR_SELECTED_SUCCESSFUL", payload: { data } });

const changeUserId = (data:string) => async (dispatch: Dispatch<any>) => dispatch({ type: "CHANGE_USER_ID_SUCCESSFUL", payload: { data } });

const changeAppointmentData = (data:any) => async (dispatch: Dispatch<any>) => dispatch({ type: "CHANGE_APPOINTMENT_DATA_SUCCESSFUL", payload: { data } });

const resetUserCreation = () => async (dispatch: Dispatch<any>) => dispatch({ type: "RESET_CREATION_USER", payload: {} });
const resetAppointmentCreation = () => async (dispatch: Dispatch<any>) => dispatch({ type: "RESET_CREATION_APPOINTMENT", payload: {} });

export const actions: ISpecialistsActions = {
  changeStep,
  getSpecialists,
  getSpecialist,
  getSpecialistLocalities,
  getSpecialistServices,
  getAttentionWindowsByService,
  createAppointment,
  createUser,
  changeService,
  changeLocality,
  changeHourSelected,
  changeUserId,
  changeAppointmentData,
  resetUserCreation,
  resetAppointmentCreation,
  createPet,
  getSpecies,
  getBreeds,
}
