import { AgendaFailure } from './../../../../../lib/domain/core/failures/agenda/agendaFailure';

export interface IAgendaState {
  getAgenda: IGetAgendaState;
}

interface IGetAgendaState {
  data: Array<any> | null;
  loading: boolean;
  successful: boolean;
  error: AgendaFailure | null; 
}

export const initialState: IAgendaState = {
  getAgenda: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  }
}