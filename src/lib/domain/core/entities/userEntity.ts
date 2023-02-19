export interface IUser {
  userId: string;
  authId: string;
  firstName: string;
  lastName: string;
  status: boolean;
  email: string;
  country: string;
  role: string;
  token: string;
  avatar: string;
  createdOn: any | null;
  updatedOn: any | null;
  deletedOn: any | null;
}
