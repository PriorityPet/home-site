import { AgendaRepository } from './../../../infrastructure/repositories/account/agenda/agendaRepository';
import { AgendaFailure } from './../../core/failures/agenda/agendaFailure';

export default class AgendaUseCase {
    private _repository: AgendaRepository = new AgendaRepository();

    async getAgenda(): Promise<Array<any>> {
        try {

            const response = await this._repository.getAgenda();

            if (response instanceof AgendaFailure) throw response;

            return response;
        } catch (error) {
        throw error;
        }
    }

}
