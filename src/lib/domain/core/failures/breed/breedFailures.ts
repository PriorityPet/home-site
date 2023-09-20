import { Failure } from "../failure";

export class BreedFailure extends Failure {}

export const enum breedFailuresEnum {
  serverError = "SERVER_ERROR"
}
