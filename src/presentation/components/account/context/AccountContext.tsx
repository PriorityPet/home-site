import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IAccountActions } from "./AccountActions";
import { AccountReducer } from "./AccountReducer";
import { IAccountState, initialState } from "./AccountState";

export interface IAccountContext {
  state: IAccountState;
  actions: IAccountActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AccountContext = createContext<IAccountContext>(
  {} as IAccountContext
);

const AccountProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(AccountReducer, initialState);

  return (
    <AccountContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
