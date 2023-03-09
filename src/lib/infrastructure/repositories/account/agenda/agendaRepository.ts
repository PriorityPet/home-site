import { AgendaFailure, agendaFailuresEnum } from './../../../../domain/core/failures/agenda/agendaFailure';
import { supabase } from '../../../../infrastructure/config/supabase/supabase-client';
import nookies from 'nookies';

export default interface IAgendaRepository {
  getAgenda(): Promise<Array<any> | AgendaFailure>;
}

export class AgendaRepository implements IAgendaRepository {

    async getAgenda(): Promise<Array<any> | AgendaFailure> {
        try {

            const creationDBresponse = await supabase.from("transacciones").select("*")
            
            return creationDBresponse.data ?? [];
        } catch (error) {
            const exception = error as any;
            return new AgendaFailure(agendaFailuresEnum.tooManyRequest);
        }
    }

}