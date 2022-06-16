const defaultState = {
    data: {},
    interested: [],
    loading: true,
  };
  
  const SET_MAIN_INFO = "SET_MAIN_INFO";
  const GET_INTERESTED_GOODS = "GET_INTERESTED_GOODS";
  
  export const mainInfoSlice = (state = defaultState, action) => {
    switch (action.type) {
      case SET_MAIN_INFO:
        return { ...state, data: action.payload, loading: false };
      case GET_INTERESTED_GOODS:
        return {...state, interested: action.payload, loading: false}
  
      default:
        return state;
    }
  };
  
  export const GetMainInfoAction = (payload) => ({
    type: SET_MAIN_INFO,
    payload,
  });

  export const GetInterestedGoods = (payload) => ({
    type: GET_INTERESTED_GOODS,
    payload,
  });
  