import { IUser } from "domain/core/entities/userEntity";
import firebase from "firebase/app";

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

export function userFromFirebaseToDocumentData(user: IUser): firebase.firestore.DocumentData {
  const userDocumentData = {
    authId: user.userId,
    administradorId: user.authId,
    nombre:  user.firstName,
    apellido: user.lastName,
    status: user.status,
    email: user.email,
    avatar: user.avatar,
    pais: user.country,
    role: user.role,
    token: user.token,
    createdOn: user.createdOn,
    updatedOn: user.updatedOn,
  } as firebase.firestore.DocumentData;

  return userDocumentData;
}
