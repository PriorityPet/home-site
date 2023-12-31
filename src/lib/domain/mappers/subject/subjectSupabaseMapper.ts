import { ISubject } from "../../core/entities/subjectEntity";


export function subjectSupabaseToMap(data: any): ISubject {
  return {
    subjectId: data?.id ?? "",
    subjectParentId: data?.sujetoPadreId ?? null,
    name: data?.nombres ?? "",
    lastName: data?.primerApellido ?? "",
    motherLastName: data?.segundoApellido ?? "",
    curp: data?.curp ?? "",
    email: data?.email ?? "",
    sex: data?.sexo ?? 0,
    gender: data?.genero ?? 0,
    phoneNumber: data?.telefono ?? "",
    country: data?.paisNacimiento ?? "",
    state: data?.estado ?? "",
    age: data?.fechaNacimiento ? getPatientAge(new Date(data.fechaNacimiento)) : null,
    ageType: data?.fechaNacimiento ? getPatientAgeType(new Date(data.fechaNacimiento)) : null,
    address: data?.direccion ?? "",
    federativeEntityId: data?.entidadFederativaId ?? null,
    municipalityId: data?.municipioId ?? null,
    countryLocation: data?.localidadPais ?? null,
    street: data?.calle ?? null,
    city: data?.ciudad ?? "",
    type: data?.tipo ?? "",
    pictureUrl: data?.avatar ?? "",
    isPatient: data?.esPaciente ?? "",
    birthDate: data?.fechaNacimiento ?? new Date(),
    createdOn: data?.fechaRegistro ? new Date(data.fechaRegistro) : new Date(),
    //updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : new Date(),
    //deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : new Date(),
  } as ISubject;
}

function getPatientAgeMonths(birthDate: Date): number {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    age = age * 12 + m;

    return age;
}

function getPatientAge(birthDate: Date): number {
  var diff_ms = Date.now() - birthDate.getTime();
  var age_dt = new Date(diff_ms); 

  if (Math.abs(age_dt.getUTCFullYear() - 1970) <= 0) return getPatientAgeMonths(birthDate);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function getPatientAgeType(birthDate: Date): string {
  var diff_ms = Date.now() - birthDate.getTime();
  var age_dt = new Date(diff_ms); 

  if (Math.abs(age_dt.getUTCFullYear() - 1970) <= 0) return "months"

  return "years"
}


export function fromSubjectSupabaseDocumentData(subject: ISubject): any {
  const documentData = {
    sujetoPadreId: subject.subjectParentId,
    nombres: subject.name,
    primerApellido: subject.lastName,
    segundoApellido: subject.motherLastName,
    curp: subject.curp === "" ? null: subject.curp,
    email: subject.email === "" ? null: subject.email,
    sexo: subject.sex,
    genero: subject.gender,
    telefono: subject.phoneNumber,
    paisNacimiento: subject.country,
    entidadFederativaId: subject.federativeEntityId,
    municipioId: subject.municipalityId,
    localidadPais: subject.countryLocation,
    calle: subject.street,
    usuarioId: subject.userId,
    tipo: subject.type,
    estado: subject.state,
    direccion: subject.address,
    ciudad: subject.city,
    esPaciente: subject.isPatient,
    avatar: subject.pictureUrl === "" ? null: subject.pictureUrl,
    fechaNacimiento: subject.birthDate ? new Date(subject.birthDate) : null,
    fechaRegistro: subject.createdOn,
    //fechaActualizacion: subject.updatedOn,
    //fechaEliminado: subject.deletedOn,
  } as any;

  return documentData;
}

/*export function relationsSubjectSupabaseToMap ( data:any ): IRelationSubject {
  const documentData = {
    id: data?.id ?? 0,
    type: data?.tipo ?? "",
    subjectIdPrincipal: data?.sujetoPrincipalId ?? "",
    subjectIdSecondary: data?.sujetoSecundarioId ?? "",
    subjectPrincipal: {} as ISubject,
    subjectSecondary: {} as ISubject
  }as IRelationSubject

  return documentData;
}*/

export function fromRelationsSubjectsSupabaseDocumentData (relationSubject: any): any {
  const documentData = {
    tipo: relationSubject.type,
    sujetoPrincipalId: relationSubject.subjectId,
    sujetoSecundarioId: relationSubject.companionId,
  }as any

  return documentData;
}