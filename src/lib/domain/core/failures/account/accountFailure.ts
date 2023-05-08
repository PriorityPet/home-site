import { Failure } from "../failure";

export class AccountFailure extends Failure {}

export const enum accountFailuresEnum {
  tooManyRequest = "TOO_MANY_REQUEST",
  errorUpdating = "ERROR_UPDATING",
  cannotUpdate = "NOT_UPDATING"
}