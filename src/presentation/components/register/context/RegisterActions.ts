import AuthUseCase from "../../../../lib/domain/useCases/auth/authUseCase";
import { Dispatch } from "react";

export interface IRegisterActions {
  signUpUser: Function;
}

const signUpUser = (obj: { email: string; password: string, username: string }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "SIGN_UP_USER_LOADING" });

    const res: string = await new AuthUseCase().signUpUser({ email: obj.email, password: obj.password, username: obj.username });

    dispatch({ type: "SIGN_UP_USER_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("from register actions")
    console.log(error)
    dispatch({ type: "SIGN_UP_USER_ERROR", payload: { error: error } });
  }
}

export const actions: IRegisterActions = {
  signUpUser
}
