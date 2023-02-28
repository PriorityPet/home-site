import MedicalRecordUseCase from "../../../../../lib/domain/useCases/medical-record/medicalRecordUseCase";
import { Dispatch } from "react";

export interface IMedicalRecordActions {
  getTreatments: Function;
}

const getTreatments = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "TREATMENTS_LOADING" });

    const res: Array<any> = await new MedicalRecordUseCase().getTreatments();

    dispatch({ type: "TREATMENTS_OBTAINED_SUCCESSFULLY", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "TREATMENTS_ERROR", payload: { error: error } });
  }
}

export const actions: IMedicalRecordActions = {
  getTreatments
}