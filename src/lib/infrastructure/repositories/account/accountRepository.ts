import { IUser } from '../../../domain/core/entities/userEntity';
import { SignUpWithPasswordCredentials, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { userSupabaseToMap } from '../../../domain/mappers/user/supabase/userSupabaseMapper';
import { supabase } from '../../../infrastructure/config/supabase/supabase-client';
import nookies from 'nookies';
import { AccountFailure, accountFailuresEnum } from '../../../domain/core/failures/account/accountFailure';

export default interface IAccountRepository {
  updateAccount(): Promise<string | AccountFailure>;
}

export class AccountRepository implements IAccountRepository {

    async updateAccount(): Promise<string | AccountFailure> {
        try {

            const creationDBresponse = await supabase.from("usuarios").insert({})
            
            return creationDBresponse.data ?? "";
        } catch (error) {
            const exception = error as any;
            return new AccountFailure(accountFailuresEnum.tooManyRequest);
        }
    }

}