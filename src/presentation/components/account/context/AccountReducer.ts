export const AccountReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'UPDATED_ACCOUNT_SUCCESSFUL':
        return {
          ...state,
          updateAccount: {
            ...state.updateAccount,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'UPDATING_ACCOUNT_LOADING':
        return {
          ...state,
          updateAccount: {
            ...state.updateAccount,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'UPDATE_ACCOUNT_ERROR':
        return {
          ...state,
          updateAccount: {
            ...state.updateAccount,
            data: null,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  