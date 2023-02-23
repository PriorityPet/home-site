import AccountUseCase from "../../../../lib/domain/useCases/account/accountUseCase";
import { Dispatch } from "react";

export interface IAccountActions {
  updateAccount: Function;
}

const updateAccount = (obj: { username: string; }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATING_ACCOUNT_LOADING" });

    const res: string = await new AccountUseCase().updateAccount({ username: obj.username });

    dispatch({ type: "UPDATED_ACCOUNT_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "UPDATE_ACCOUNT_ERROR", payload: { error: error } });
  }
}

export const actions: IAccountActions = {
  updateAccount
}