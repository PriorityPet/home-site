import React, { createContext, Dispatch, useReducer } from "react";
import { actions, ILoginActions } from "./LoginActions";
import { LoginReducer } from "./LoginReducer";
import { ILoginState, initialState } from "./LoginState";

export interface ILoginContext {
  state: ILoginState;
  actions: ILoginActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const LoginContext = createContext<ILoginContext>(
  {} as ILoginContext
);

const LoginProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(LoginReducer, initialState);

  return (
    <LoginContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
