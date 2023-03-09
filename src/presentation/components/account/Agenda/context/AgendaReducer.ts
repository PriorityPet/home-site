export const AgendaReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_AGENDA_SUCCESSFUL':
        return {
          ...state,
          getAgenda: {
            ...state.getAgenda,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GETTING_AGENDA_LOADING':
        return {
          ...state,
          getAgenda: {
            ...state.getAgenda,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_AGENDA_ERROR':
        return {
          ...state,
          getAgenda: {
            ...state.getAgenda,
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
  