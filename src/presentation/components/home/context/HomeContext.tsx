import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IHomeActions } from "./HomeActions";
import { HomeReducer } from "./HomeReducer";
import { IHomeState, initialState } from "./HomeState";

export interface IHomeContext {
  state: IHomeState;
  actions: IHomeActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const HomeContext = createContext<IHomeContext>(
  {} as IHomeContext
);

const HomeProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(HomeReducer, initialState);

  return (
    <HomeContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
