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
    case 'CREATE_APPOINTMENT_LOADING':
      return {
        ...state,
        createAppointment: {
          ...state.createAppointment,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'CREATE_APPOINTMENT_SUCCESSFUL':
      return {
        ...state,
        createAppointment: {
          ...state.createAppointment,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CREATE_APPOINTMENT_ERROR':
      return {
        ...state,
        createAppointment: {
          ...state.createAppointment,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'CREATE_USER_LOADING':
      return {
        ...state,
        createUser: {
          ...state.createUser,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'CREATE_USER_SUCCESSFUL':
      return {
        ...state,
        createUser: {
          ...state.createUser,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CREATE_USER_ERROR':
      return {
        ...state,
        createUser: {
          ...state.createUser,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'CHANGE_STEP_SUCCESSFUL':
      return {
        ...state,
        changeStep: {
          ...state.changeStep,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHANGE_SERVICE_SUCCESSFUL':
      return {
        ...state,
        changeService: {
          ...state.changeService,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHANGE_LOCALITY_SUCCESSFUL':
      return {
        ...state,
        changeLocality: {
          ...state.changeLocality,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHANGE_HOUR_SELECTED_SUCCESSFUL':
      return {
        ...state,
        changeHourSelected: {
          ...state.changeHourSelected,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHANGE_USER_ID_SUCCESSFUL':
      return {
        ...state,
        changeUserId: {
          ...state.changeUserId,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHANGE_APPOINTMENT_DATA_SUCCESSFUL':
      return {
        ...state,
        changeAppointmentData: {
          ...state.changeAppointmentData,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'RESET_CREATION_USER':
      return {
        ...state,
        createUser: {
          data: null,
          loading: false,
          successful: false,
          error: null,
        },
      };
    case 'RESET_CREATION_APPOINTMENT':
      return {
        ...state,
        createAppointment: {
          data: null,
          loading: false,
          successful: false,
          error: null,
        },
      };
    case 'CREATE_PET_LOADING' :
      return {
        ...state,
        createPet: {
          ...state.createPet,
          data: {},
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'CREATE_PET_SUCCESSFUL' :
      return {
        ...state,
        createPet: {
          ...state.createPet,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      }
    case 'CREATE_PET_ERROR' :
      return {
        ...state,
        createPet: {
          ...state.createPet,
          data: {},
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }

    case 'GET_SPECIES_LOADING' :
      return {
        ...state,
        species: {
          ...state.species,
          data: {},
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_SPECIES_SUCCESSFUL' :
      return {
        ...state,
        species: {
          ...state.species,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      }
    case 'GET_SPECIES_ERROR' :
      return {
        ...state,
        species: {
          ...state.species,
          data: {},
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }

    case 'GET_BREEDS_LOADING' :
      return {
        ...state,
        breeds: {
          ...state.breeds,
          data: {},
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_BREEDS_SUCCESSFUL' :
      return {
        ...state,
        breeds: {
          ...state.breeds,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      }
    case 'GET_BREEDS_ERROR' :
      return {
        ...state,
        breeds: {
          ...state.breeds,
          data: {},
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }
    case 'GET_INITIAL_DATE_LOADING' :
      return {
        ...state,
        getInitialDate: {
          ...state.getInitialDate,
          data: "",
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_INITIAL_DATE_SUCCESSFUL' :
      return {
        ...state,
        getInitialDate: {
          ...state.getInitialDate,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      }
    case 'GET_INITIAL_DATE_ERROR' :
      return {
        ...state,
        getInitialDate: {
          ...state.getInitialDate,
          data: "",
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }
    default:
      return state;
  }
};
