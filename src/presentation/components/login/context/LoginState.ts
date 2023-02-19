import { AuthFailure } from "../../../../lib/domain/core/failures/auth/authFailure";

export interface ILoginState {
  signInUser: ISignInUserState;
}

interface ISignInUserState {
  data: string | null;
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

export const initialState: ILoginState = {
  signInUser: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  }
}