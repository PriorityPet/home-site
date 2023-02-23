import { AccountFailure } from './../../../../lib/domain/core/failures/account/accountFailure';

export interface IAccountState {
  updateAccount: IUpdateAccountState;
}

interface IUpdateAccountState {
  data: string | null;
  loading: boolean;
  successful: boolean;
  error: AccountFailure | null; 
}

export const initialState: IAccountState = {
  updateAccount: {
    data: null,
    loading: false,
    successful: false,
    error: null,
  }
}