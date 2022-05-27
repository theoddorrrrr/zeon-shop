const defaultState = {
    data: {},
    loading: true,
  };
  
  const SET_MAIN_INFO = "SET_MAIN_INFO";
  
  export const mainInfoSlice = (state = defaultState, action) => {
    switch (action.type) {
      case SET_MAIN_INFO:
        return { ...state, data: action.payload, loading: false };
  
      default:
        return state;
    }
  };
  
  export const GetMainInfoAction = (payload) => ({
    type: SET_MAIN_INFO,
    payload,
  });
  