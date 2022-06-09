const defaultState = {
  data: {},
  loading: true,
};

const GET_NEWS = "GET_NEWS";
const GET_MORE_NEWS = "GET_MORE_NEWS";

export const newsSlice = (state = defaultState, action) => {
  switch (action.type) {
    case GET_NEWS:
      return { ...state, data: action.payload, loading: false };

    case GET_MORE_NEWS:
      const data = [...state.data, ...action.payload];

      return { ...state, data: data, loading: false };

    default:
      return state;
  }
};

export const GetNewsAction = (payload) => ({ type: GET_NEWS, payload });
export const GetMoreNewsAction = (payload) => ({
  type: GET_MORE_NEWS,
  payload,
});
