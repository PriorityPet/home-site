import { Failure } from "../failure";

export class OrdersFailure extends Failure {}

export const enum ordersFailuresEnum {
  tooManyRequest = "TOO_MANY_REQUEST",
  errorGettingOrders = "ERROR_UPDATING"
}