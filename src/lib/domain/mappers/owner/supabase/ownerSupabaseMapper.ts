import { IOwner } from "@/lib/domain/core/entities/ownerEntity";


export function ownerSupabaseToMap(data: any): IOwner {
    return {
        id: data?.id ?? 0,
        firstName: data?.nombres ?? "",
        lastName: data?.primerApellido ?? "",
        phoneNumber: data?.telefono ?? "",
        email: data?.email ?? "",
        sex: data?.sexo ?? 0,
        gender: data?.genero ?? 0,
        dni: data?.curp ?? "",
        birthDate: data?.fechaNacimiento ? new Date(data.fechaNacimiento) : new Date(),
        createdAt: data?.fechaRegistro ? new Date(data.fechaRegistro) : new Date()
    } as IOwner;
}

export function fromOwnerSupabaseDocumentData(owner: IOwner): any {
    const documentData = {
      nombre: owner.firstName,
      apellido: owner.lastName,
      email: owner.email,
      sexo: owner.sex,
      genero: owner.gender,
      identificacion: owner.dni,
      fechaNacimiento: owner.birthDate,
    } as any;
  
    return documentData;
}