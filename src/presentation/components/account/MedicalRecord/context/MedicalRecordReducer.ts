export const MedicalRecordReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'TREATMENTS_OBTAINED_SUCCESSFULLY':
        return {
          ...state,
          getTreatments: {
            ...state.getTreatments,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'TREATMENTS_LOADING':
        return {
          ...state,
          getTreatments: {
            ...state.getTreatments,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'TREATMENTS_ERROR':
        return {
          ...state,
          getTreatments: {
            ...state.getTreatments,
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
  