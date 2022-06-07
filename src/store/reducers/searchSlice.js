const defaultState = {
    data: [],
    loading: true,
  };
  
  const GET_ALL_GOODS = "GET_ALL_GOODS";
  
  export const searchSlice = (state = defaultState, action) => {
    switch (action.type) {
      case GET_ALL_GOODS:
        return { ...state, data: action.payload, loading: false };
  
      default:
        return state;
    }
  };
  
  export const GetAllDataAction = (payload) => ({
    type: GET_ALL_GOODS,
    payload,
  });
  
  
  