import { MedicalRecordFailure, medicalRecordFailuresEnum } from './../../../domain/core/failures/medical-record/medicalRecordFailure';
import { supabase } from '../../../infrastructure/config/supabase/supabase-client';

export default interface IMedicalRecordRepository {
  getTreatments(): Promise<Array<any> | MedicalRecordFailure>;
}

export class MedicalRecordRepository implements IMedicalRecordRepository {

    async getTreatments(): Promise<Array<any> | MedicalRecordFailure> {
        try {

            const res = await supabase.from("medical_records").select("*")
            
            return res.data ?? [];
        } catch (error) {
            const exception = error as any;
            return new MedicalRecordFailure(medicalRecordFailuresEnum.tooManyRequest);
        }
    }

}