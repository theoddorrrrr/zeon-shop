const defaultState = {
    data: {},
    loading: true,
  };
  
  const GET_NEWS = "GET_NEWS";
  
  export const newsSlice= (state = defaultState, action) => {
    switch (action.type) {
      case GET_NEWS:
        // console.log(state);
        // console.log(action.payload);
        return { ...state, data: action.payload, loading: false };
  
      default:
        return state;
    }
  };
  
  export const GetNewsAction = (payload) => ({ type: GET_NEWS, payload });
  

