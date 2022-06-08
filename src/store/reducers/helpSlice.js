const defaultState = {
    data: {},
    loading: true,
  };
  
  const GET_HELP = "GET_HELP";
  
  export const helpSlice= (state = defaultState, action) => {
    switch (action.type) {
      case GET_HELP:
        return { ...state, data: action.payload, loading: false };
  
      default:
        return state;
    }
  };
  
  export const GetHelpAction = (payload) => ({ type: GET_HELP, payload });
  

