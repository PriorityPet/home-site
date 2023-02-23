import { OrdersFailure } from './../../../../../lib/domain/core/failures/orders/ordersFailure';

export interface IOrdersState {
  getOrders: IGetOrdersState;
}

interface IGetOrdersState {
  data: Array<any> | null;
  loading: boolean;
  successful: boolean;
  error: OrdersFailure | null; 
}

export const initialState: IOrdersState = {
  getOrders: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  }
}