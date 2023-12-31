export const HomeReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_MEDICAL_CENTERS_LOADING':
      return {
        ...state,
        getMedicalCenters: {
          ...state.getMedicalCenters,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_MEDICAL_CENTERS_SUCCESSFUL':
      return {
        ...state,
        getMedicalCenters: {
          ...state.getMedicalCenters,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_MEDICAL_CENTERS_ERROR':
      return {
        ...state,
        getMedicalCenters: {
          ...state.getMedicalCenters,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
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
    default:
      return state;
  }
};
