import { Failure } from "../failure";

export class AuthFailure extends Failure {}

export const enum authFailuresEnum {
  alreadyExists = "ALREADY_EXISTS",
  wrongPassword = "WRONG_PASSWORD",
  tooManyRequest = "TOO_MANY_REQUEST",
  userNotFound = "INVALID_CREDENTIALS",
  serverError = "SERVER_ERROR"
}
