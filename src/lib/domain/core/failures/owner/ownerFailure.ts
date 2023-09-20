import { Failure } from "../failure";

export class OwnerFailure extends Failure {}

export const enum ownerFailuresEnum {
  serverError = "SERVER_ERROR",
  duplicateDNI = "DUPLICATE_DNI",
  duplateEmail = "DUPLICATE_EMAIL",
}
