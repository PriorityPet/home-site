import { Failure } from "../failure";

export class MedicalRecordFailure extends Failure {}

export const enum medicalRecordFailuresEnum {
  tooManyRequest = "TOO_MANY_REQUEST",
  cannotLoadList = "CANNOT_LOAD_LIST",
  serverError = "SERVER_ERROR",
}
