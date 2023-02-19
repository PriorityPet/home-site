import { IUser } from "../../../domain/core/entities/userEntity";

export function userFirebaseToMap(data: any): IUser {
  return {
    userId: data?.subjectId ?? "",
    authId: data?.subjectId ?? "",
    firstName: data?.firstName ?? "",
    lastName: data?.lastName ?? "",
    status: data?.status ?? false,
    email: data?.email ?? "",
    avatar: data?.profilePictureUrl ?? "",
    country: data?.country ?? "",
    role: data?.role ?? "",
    token: data?.token ?? "",
    createdOn: data?.createdOn ?? null,
    updatedOn: data?.updatedOn ?? null,
    deletedOn: data?.deletedOn ?? null,
  } as IUser;
}
