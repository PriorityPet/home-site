
import { IUser } from '../../../domain/core/entities/userEntity';
import { AccountRepository } from '../../../infrastructure/repositories/account/accountRepository';
import { AccountFailure } from '../../core/failures/account/accountFailure';
import { AuthFailure } from '../../core/failures/auth/authFailure';

export default class AccountUseCase {
    private _repository: AccountRepository = new AccountRepository();

    async updateAccount(obj: { username: string }): Promise<string> {
        try {

            const response = await this._repository.updateAccount();

            if (response instanceof AccountFailure) throw response;

            return response;
        } catch (error) {
        throw error;
        }
    }

    async getAccount(): Promise<IUser> {
        try {

            const response = await this._repository.getAccount();

            if (response instanceof AccountFailure) throw response;

            return response;
        } catch (error) {
        throw error;
        }
    }

}
