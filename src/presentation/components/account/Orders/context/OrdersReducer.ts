export const OrdersReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_ORDERS_SUCCESSFUL':
        return {
          ...state,
          getOrders: {
            ...state.getOrders,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GETTING_ORDERS_LOADING':
        return {
          ...state,
          getOrders: {
            ...state.getOrders,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_ORDERS_ERROR':
        return {
          ...state,
          getOrders: {
            ...state.getOrders,
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
  