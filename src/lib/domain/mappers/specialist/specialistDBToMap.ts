import { IProvider, Specialist } from "../../core/entities/specialists/specialist";

export function specialistDBToMap(data: any, provider: any): Specialist {
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
    provider: provider ? providerSupabaseToMap(provider) : null,
  } as Specialist;
}

export function providerSupabaseToMap(data: any): IProvider {
  return {
    id: data?.user ?? "",
    userId: data?.id ?? "",
    avatar: data?.fotoUrl ?? "",
    ruc: data?.ruc ?? "",
    servicesSummary: data?.resumenServicios ?? "",
    shortDescription: data?.descripcionCorta ?? "",
    address: data?.direccion ?? "",
    personType: data?.tipoPersona ?? "",
    providerTypeId: data?.tipoProveedorId ?? "",
    name: data?.nombre ?? "",
    email: data?.correo ?? "",
    phoneNumber: data?.telefono ?? "",
    role: data?.rol ?? "",
    createdOn: data?.fechaCreacion ?? "",
  } as IProvider;
}