const defaultState = {
  data: [],
  loading: true,
};

const GET_HOT_GOODS = "GET_HOT_GOODS";
const GET_MORE_HOT_GOODS = "GET_MORE_HOT_GOODS";

export const hotGoodsSlice = (state = defaultState, action) => {
  switch (action.type) {
    case GET_HOT_GOODS:
      return { ...state, data: action.payload, loading: false };

    case GET_MORE_HOT_GOODS:
      const data = [...state.data, ...action.payload];
      return { ...state, data: data, loading: false };

    default:
      return state;
  }
};

export const GetHotGoodsAction = (payload) => ({
  type: GET_HOT_GOODS,
  payload,
});

export const GetMoreHotGoodsAction = (payload) => ({
  type: GET_MORE_HOT_GOODS,
  payload,
});
