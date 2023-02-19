import AuthUseCase from "../../../../lib/domain/useCases/auth/authUseCase";
import { Dispatch } from "react";

export interface ILoginActions {
  signInUser: Function;
}

const signInUser = (obj: { email: string; password: string }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "SIGN_IN_USER_LOADING" });

    const res: string = await new AuthUseCase().signInUser({ email: obj.email, password: obj.password });

    dispatch({ type: "SIGN_IN_USER_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "SIGN_IN_USER_ERROR", payload: { error: error } });
  }
}

export const actions: ILoginActions = {
  signInUser
}
