import { MedicalRecordRepository } from './../../../infrastructure/repositories/medical-record/medicalRecordRepository';
import { MedicalRecordFailure } from './../../core/failures/medical-record/medicalRecordFailure';

export default class MedicalRecordUseCase {
    private _repository: MedicalRecordRepository = new MedicalRecordRepository();

    async getTreatments(): Promise<Array<any>> {
        try {

            const response = await this._repository.getTreatments();

            if (response instanceof MedicalRecordFailure) throw response;

            return response;
        } catch (error) {
        throw error;
        }
    }

}
