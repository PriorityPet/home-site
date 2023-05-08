import HomeUseCase from '@/lib/domain/useCases/home/homeUseCase';
import { ILocality } from './../../../../lib/domain/core/entities/localityEntity';
import { Dispatch } from "react";
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist';

export interface IHomeActions {
  getMedicalCenters: Function;
  getSpecialists: Function;
}

const getMedicalCenters = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_MEDICAL_CENTERS_LOADING" });
    
    const res: Array<ILocality> = await new HomeUseCase().getMedicalCenters();

    dispatch({ type: "GET_MEDICAL_CENTERS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_MEDICAL_CENTERS_ERROR", payload: { error: error } });
  }
}

const getSpecialists = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SPECIALISTS_LOADING" });
    
    const res: Array<Specialist> = await new HomeUseCase().getSpecialists();

    dispatch({ type: "GET_SPECIALISTS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SPECIALISTS_ERROR", payload: { error: error } });
  }
}

export const actions: IHomeActions = {
  getMedicalCenters,
  getSpecialists
}
