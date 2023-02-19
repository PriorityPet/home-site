export const RegisterReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SIGN_UP_USER_SUCCESSFUL':
      return {
        ...state,
        signUpUser: {
          ...state.signUpUser,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'SIGN_UP_USER_LOADING':
      return {
        ...state,
        signUpUser: {
          ...state.signUpUser,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'SIGN_UP_USER_ERROR':
      return {
        ...state,
        signUpUser: {
          ...state.signUpUser,
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
