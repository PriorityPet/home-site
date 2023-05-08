import { IUser } from './../../../domain/core/entities/userEntity';
import { SignUpWithPasswordCredentials, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { userSupabaseToMap } from '../../../domain/mappers/user/supabase/userSupabaseMapper';
import { supabase } from '../../../infrastructure/config/supabase/supabase-client';
import nookies from 'nookies';
import { AuthFailure, authFailuresEnum } from '../../../domain/core/failures/auth/authFailure';

export default interface IAuthRepository {
  signInUser(obj: {
    email: string;
    password: string;
  }): Promise<string | AuthFailure>;
  signUpUser(obj: {
    email: string;
    password: string;
    username: string;
  }): Promise<string | AuthFailure>;
  getUserAuthenticated(obj: { accessToken: string }): Promise<IUser | AuthFailure>;
  signOutUser(): Promise<boolean | AuthFailure>;
  changePassword(obj: {
    currentPassword: string;
    newPassword: string;
  }): Promise<boolean | AuthFailure>;
}

export class AuthRepository implements IAuthRepository {

  async signUpUser(obj: {
    email: string;
    password: string;
    username: string;
  }): Promise<string | AuthFailure> {
    try {
      const credentials: SignUpWithPasswordCredentials = {
        email: obj.email,
        password: obj.password
      }

      const response = await supabase.auth.signUp(credentials);
      const creationDBresponse = await supabase.from("usuarios").insert({
        uid: response.data.user?.id,
        nombre: obj.username
      })
      
      if (creationDBresponse.error?.code === "23505") return new AuthFailure(authFailuresEnum.serverError);
      
      nookies.set(undefined, 'access_token', response.data.session?.access_token ?? "", { path: '/' });
      
      return response.data.session?.access_token ?? "";
    } catch (error) {
      const exception = error as any;
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async signInUser(obj: {
    email: string;
    password: string;
  }): Promise<string | AuthFailure> {
    try {
      const credentials: SignInWithPasswordCredentials = {
        email: obj.email,
        password: obj.password
      }

      const response = await supabase.auth.signInWithPassword(credentials);

      if (response.error?.message === "Invalid login credentials") return new AuthFailure(authFailuresEnum.wrongPassword);

      nookies.set(undefined, 'access_token', response.data.session?.access_token ?? "", { path: '/' });
      
      return response.data.session?.access_token ?? "";
    } catch (error) {
      const exception = error as any;
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async getUserAuthenticated(obj: { accessToken: string }): Promise<IUser | AuthFailure> {
    try {      
      const userCredential = await supabase.auth.getUser(obj.accessToken);

      let user: IUser = {} as IUser;
      
      if (userCredential.data.user?.id) {
        const snapshot = await supabase.from("Administradores").select().eq("administradorId", userCredential.data.user?.id).single();
        
        if (snapshot) {
          user = userSupabaseToMap(snapshot.data);
          nookies.set(undefined, 'access_token', obj.accessToken ?? "", { path: '/' });
        }
      }

      return JSON.parse(JSON.stringify(user));
    } catch (error) {
      const exception = error as any;
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async signOutUser(): Promise<boolean | AuthFailure> {
    try {
      await supabase.auth.signOut();

      nookies.set(undefined, 'access_token', '', { path: '/' });

      return true;
    } catch (error) {
      const exception = error as any;
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async changePassword(obj: { currentPassword: string; newPassword: string }): Promise<boolean | AuthFailure> {
    try {
      const user = (await supabase.auth.getSession()).data.session?.user;
     
      if (!user) throw new Error("auth/user-not-found");

      await supabase.auth.updateUser({ password: obj.newPassword })

      return true;
    } catch (error) {
      const exception = error as any;
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }
}