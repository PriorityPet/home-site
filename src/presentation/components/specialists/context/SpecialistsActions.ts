import HomeUseCase from '@/lib/domain/useCases/home/homeUseCase';
import { ILocality } from '../../../../lib/domain/core/entities/localityEntity';
import { Dispatch } from "react";
import SpecialistsUseCase from '@/lib/domain/useCases/specialists/specialistsUseCase';
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist';

export interface ISpecialistsActions {
  getSpecialists: Function;
  getSpecialist: Function;
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

const getSpecialist = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SPECIALIST_LOADING" });
    
    const res: Specialist = await new SpecialistsUseCase().getSpecialist();

    dispatch({ type: "GET_SPECIALIST_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SPECIALIST_ERROR", payload: { error: error } });
  }
}

export const actions: ISpecialistsActions = {
  getSpecialists,
  getSpecialist,
}
