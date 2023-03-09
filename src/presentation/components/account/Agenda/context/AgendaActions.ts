import AgendaUseCase from "../../../../../lib/domain/useCases/agenda/agendaUseCase";
import { Dispatch } from "react";

export interface IAgendaActions {
  getAgenda: Function;
}

const getAgenda = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GETTING_AGENDA_LOADING" });

    const res: Array<any> = await new AgendaUseCase().getAgenda()

    dispatch({ type: "GET_AGENDA_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_AGENDA_ERROR", payload: { error: error } });
  }
}

export const actions: IAgendaActions = {
  getAgenda
}