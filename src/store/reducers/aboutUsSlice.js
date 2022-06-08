const defaultState = {
    data: {},
    loading: true,
  };
  
  const GET_ABOUT_US = "GET_ABOUT_US";
  
  export const aboutUsSlice= (state = defaultState, action) => {
    switch (action.type) {
      case GET_ABOUT_US:
        return { ...state, data: action.payload, loading: false };
  
      default:
        return state;
    }
  };
  
  export const GetAboutUsActuion = (payload) => ({ type: GET_ABOUT_US, payload });
  

