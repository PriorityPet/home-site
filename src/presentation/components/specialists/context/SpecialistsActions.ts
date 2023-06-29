import { ILocality } from '../../../../lib/domain/core/entities/localityEntity';
import { Dispatch } from "react";
import SpecialistsUseCase from '@/lib/domain/useCases/specialists/specialistsUseCase';
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist';
import AuthUseCase from '@/lib/domain/useCases/auth/authUseCase';

export interface ISpecialistsActions {
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

const getSpecialist = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SPECIALIST_LOADING" });
    
    const res: Specialist = await new SpecialistsUseCase().getSpecialist(id);

    dispatch({ type: "GET_SPECIALIST_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SPECIALIST_ERROR", payload: { error: error } });
  }
}

const getSpecialistLocalities = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SPECIALIST_LOCALITIES_LOADING" });
    
    const res: any[] = await new SpecialistsUseCase().getSpecialistLocalities(id);

    dispatch({ type: "GET_SPECIALIST_LOCALITIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SPECIALIST_LOCALITIES_ERROR", payload: { error: error } });
  }
}

const getSpecialistServices = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SPECIALIST_SERVICES_LOADING" });
    
    const res: any[] = await new SpecialistsUseCase().getSpecialistServices(id);

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

const changeService = (id:number) => async (dispatch: Dispatch<any>) => dispatch({ type: "CHANGE_SERVICE_SUCCESSFUL", payload: { data: id } });

const changeLocality = (id:number) => async (dispatch: Dispatch<any>) => dispatch({ type: "CHANGE_LOCALITY_SUCCESSFUL", payload: { data: id } });

const changeHourSelected = (data:string) => async (dispatch: Dispatch<any>) => dispatch({ type: "CHANGE_HOUR_SELECTED_SUCCESSFUL", payload: { data } });

const changeUserId = (data:string) => async (dispatch: Dispatch<any>) => dispatch({ type: "CHANGE_USER_ID_SUCCESSFUL", payload: { data } });

const changeAppointmentData = (data:any) => async (dispatch: Dispatch<any>) => dispatch({ type: "CHANGE_APPOINTMENT_DATA_SUCCESSFUL", payload: { data } });

export const actions: ISpecialistsActions = {
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
}
