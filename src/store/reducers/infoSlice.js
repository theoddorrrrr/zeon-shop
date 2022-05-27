const defaultState = {
  data: {},
  loading: true,
};

const GET_INFO = "GET_INFO";

export const infoSlice = (state = defaultState, action) => {
  switch (action.type) {
    case GET_INFO:
      return { ...state, data: action.payload, loading: false };

    default:
      return state;
  }
};

export const GetInfoAction = (payload) => ({ type: GET_INFO, payload });
