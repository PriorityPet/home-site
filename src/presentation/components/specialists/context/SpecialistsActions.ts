import { ILocality } from '../../../../lib/domain/core/entities/localityEntity';
import { Dispatch } from "react";
import SpecialistsUseCase from '@/lib/domain/useCases/specialists/specialistsUseCase';
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist';

export interface ISpecialistsActions {
  getSpecialists: Function;
  getSpecialist: Function;
  getSpecialistLocalities: Function;
  getSpecialistServices: Function;
  getAttentionWindowsByService: Function;
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

export const actions: ISpecialistsActions = {
  getSpecialists,
  getSpecialist,
  getSpecialistLocalities,
  getSpecialistServices,
  getAttentionWindowsByService,
}
