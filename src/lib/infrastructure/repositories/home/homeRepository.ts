import { GET_MEDICAL_CENTERS_ENDPOINT } from '../../config/api/dictionary';
import { ILocality } from './../../../domain/core/entities/localityEntity';
import { LocalityFailure, localityFailuresEnum } from './../../../domain/core/failures/locality/localityFailure';
import nookies from 'nookies';

export default interface IHomeRepository {
}

export class HomeRepository implements IHomeRepository {}