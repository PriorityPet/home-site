import { Specialist } from "../../core/entities/specialists/specialist";

export function specialistDBToMap(data: any): Specialist {
  return {
    userId: data?.usuarioId ?? "",
    accountId: data?.id ?? "",
    names: data?.nombres ?? "",
    firstName: data?.primerApellido ?? "",
    lastName: data?.segundoApellido ?? "",
    phone: data?.telefono ?? "",
    status: data?.estado ?? 0,
    email: data?.email ?? "",
    curp: data?.curp ?? "",
    birthDate: data?.fechaNacimiento ?? "",
    sex: data?.sexo ?? 0,
    websiteUrl: data?.sitioWeb ?? "",
    avatar: data?.avatar ?? "",
    aboutMe: data?.acerca ?? "",
    shortDescription: data?.descripcionCorta ?? "",
    country: data?.paisNacimiento ?? "",
    personType: data?.tipoPersona ?? 0,
    pwaProfressionId: data?.cedulaProfesional ?? null,
    professionalLicense: data?.profesionPQAId ?? "",
    professionalLicenseInstitution: data?.institucionCedulaProfesional ?? "",
    specialities: data?.EspecialidadesDoctores ?? "",
  } as Specialist;
}