import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IAgendaActions } from "./AgendaActions";
import { AgendaReducer } from "./AgendaReducer";
import { IAgendaState, initialState } from "./AgendaState";

export interface IAgendaContext {
  state: IAgendaState;
  actions: IAgendaActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AgendaContext = createContext<IAgendaContext>(
  {} as IAgendaContext
);

const AgendaProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(AgendaReducer, initialState);

  return (
    <AgendaContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </AgendaContext.Provider>
  );
};

export default AgendaProvider;
