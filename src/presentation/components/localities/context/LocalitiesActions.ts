import LocalitiesUseCase from '@/lib/domain/useCases/localities/localitiesUseCase';
import { ILocality } from './../../../../lib/domain/core/entities/localityEntity';
import { Dispatch } from "react";

export interface ILocalitiesActions {
  getMedicalCenters: Function;
}

const getMedicalCenters = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_MEDICAL_CENTERS_LOADING" });
    
    const res: Array<ILocality> = await new LocalitiesUseCase().getMedicalCenters();

    dispatch({ type: "GET_MEDICAL_CENTERS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_MEDICAL_CENTERS_ERROR", payload: { error: error } });
  }
}

export const actions: ILocalitiesActions = {
  getMedicalCenters
}
