import { Failure } from "../failure";

export class SpecialistsFailure extends Failure {}

export const enum specialistsFailuresEnum {
  specialistsNotFound = "SPECIALISTS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
