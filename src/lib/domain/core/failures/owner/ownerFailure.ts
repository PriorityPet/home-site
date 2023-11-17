import { Failure } from "../failure";

export class OwnerFailure extends Failure {}

export const enum ownerFailuresEnum {
  alreadyExists = "ALREADY_EXISTS",
  serverError = "SERVER_ERROR",
  duplicateDNI = "DUPLICATE_DNI",
  duplateEmail = "DUPLICATE_EMAIL",
}
