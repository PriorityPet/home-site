import { Failure } from "../failure";

export class AgendaFailure extends Failure {}

export const enum agendaFailuresEnum {
  tooManyRequest = "TOO_MANY_REQUEST",
  cannotGetAgenda = "CANNOT_GET_AGENDA"
}
