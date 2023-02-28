import { MedicalRecordFailure } from './../../../../../lib/domain/core/failures/medical-record/medicalRecordFailure';

export interface IMedicalRecordState {
  getTreatments: IUpdateMedicalRecordState;
}

interface IUpdateMedicalRecordState {
  data: Array<any> | null;
  loading: boolean;
  successful: boolean;
  error: MedicalRecordFailure | null; 
}

export const initialState: IMedicalRecordState = {
  getTreatments: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  }
}