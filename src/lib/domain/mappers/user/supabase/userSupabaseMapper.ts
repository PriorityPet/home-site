import { IUser } from "../../../core/entities/userEntity";

export function userSupabaseToMap(data: any): IUser {
  return {
    userId: data?.administradorId ?? "",
    authId: data?.administradorId ?? "",
    firstName: data?.nombre ?? "",
    lastName: data?.apellido ?? "",
    status: data?.estado ?? false,
    email: data?.correo ?? "",
    avatar: data?.urlFotoPerfil ?? "",
    country: data?.pais ?? "",
    role: data?.rol ?? "",
    token: data?.llaveFcm ?? "",
    createdOn: data?.fechaCreacion ? new Date(data.fechaCreacion) : new Date(),
    updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : new Date(),
    deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : new Date(),
  } as IUser;
}

export function userFromSupabaseToDocumentData(user: IUser): any {
  const userDocumentData = {
    authId: user.userId,
    administradorId: user.authId,
    nombre:  user.firstName,
    apellido: user.lastName,
    estado: user.status,
    correo: user.email,
    urlFotoPerfil: user.avatar,
    pais: user.country,
    rol: user.role,
    llaveFcm: user.token,
    fechaCreacion: user.createdOn,
    fechaActualizacion: user.updatedOn,
  } as any;

  return userDocumentData;
}
