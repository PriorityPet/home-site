import OrdersUseCase from "../../../../../lib/domain/useCases/orders/ordersUseCase";
import { Dispatch } from "react";

export interface IOrdersActions {
  getOrders: Function;
}

const getOrders = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GETTING_ORDERS_LOADING" });

    const res: Array<any> = await new OrdersUseCase().getOrders()

    dispatch({ type: "GET_ORDERS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_ORDERS_ERROR", payload: { error: error } });
  }
}

export const actions: IOrdersActions = {
  getOrders
}