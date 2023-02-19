import { AuthFailure } from "../../../../lib/domain/core/failures/auth/authFailure";

export interface IRegisterState {
  signUpUser: ISignUpUserState;
}

interface ISignUpUserState {
  data: string | null;
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

export const initialState: IRegisterState = {
  signUpUser: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  }
}