import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IOrdersActions } from "./OrdersActions";
import { OrdersReducer } from "./OrdersReducer";
import { IOrdersState, initialState } from "./OrdersState";

export interface IOrdersContext {
  state: IOrdersState;
  actions: IOrdersActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const OrdersContext = createContext<IOrdersContext>(
  {} as IOrdersContext
);

const OrdersProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(OrdersReducer, initialState);

  return (
    <OrdersContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
