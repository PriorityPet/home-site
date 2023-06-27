export const SpecialistsReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_SPECIALISTS_LOADING':
      return {
        ...state,
        getSpecialists: {
          ...state.getSpecialists,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_SPECIALISTS_SUCCESSFUL':
      return {
        ...state,
        getSpecialists: {
          ...state.getSpecialists,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_SPECIALISTS_ERROR':
      return {
        ...state,
        getSpecialists: {
          ...state.getSpecialists,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_SPECIALIST_LOADING':
      return {
        ...state,
        getSpecialist: {
          ...state.getSpecialist,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_SPECIALIST_SUCCESSFUL':
      return {
        ...state,
        getSpecialist: {
          ...state.getSpecialist,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_SPECIALIST_ERROR':
      return {
        ...state,
        getSpecialist: {
          ...state.getSpecialist,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_SPECIALIST_LOCALITIES_LOADING':
      return {
        ...state,
        getSpecialistLocalities: {
          ...state.getSpecialistLocalities,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_SPECIALIST_LOCALITIES_SUCCESSFUL':
      return {
        ...state,
        getSpecialistLocalities: {
          ...state.getSpecialistLocalities,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_SPECIALIST_LOCALITIES_ERROR':
      return {
        ...state,
        getSpecialistLocalities: {
          ...state.getSpecialistLocalities,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_SPECIALIST_SERVICES_LOADING':
      return {
        ...state,
        getSpecialistServices: {
          ...state.getSpecialistServices,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_SPECIALIST_SERVICES_SUCCESSFUL':
      return {
        ...state,
        getSpecialistServices: {
          ...state.getSpecialistServices,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_SPECIALIST_SERVICES_ERROR':
      return {
        ...state,
        getSpecialistServices: {
          ...state.getSpecialistServices,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_SERVICE_ATTENTION_WINDOW_LOADING':
      return {
        ...state,
        getAttentionWindowsByService: {
          ...state.getAttentionWindowsByService,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_SERVICE_ATTENTION_WINDOW_SUCCESSFUL':
      return {
        ...state,
        getAttentionWindowsByService: {
          ...state.getAttentionWindowsByService,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_SERVICE_ATTENTION_WINDOW_ERROR':
      return {
        ...state,
        getAttentionWindowsByService: {
          ...state.getAttentionWindowsByService,
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
