const defaultState = {
  data: [],
  limited: [],
  loading: true,
  loadingLimited: true,
};

const GET_HOT_GOODS = "GET_HOT_GOODS";
const GET_MORE_HOT_GOODS = "GET_MORE_HOT_GOODS";
const GET_LIMITED_GOT_GOODS = "GET_LIMITED_GOT_GOODS";

export const hotGoodsSlice = (state = defaultState, action) => {
  switch (action.type) {
    case GET_HOT_GOODS:
      return { ...state, data: action.payload, loading: false };

    case GET_MORE_HOT_GOODS:
      const data = [...state.data, ...action.payload];
      return { ...state, data: data, loading: false };

    case GET_LIMITED_GOT_GOODS:

      return { ...state, limited: action.payload, loadingLimited: false };

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

export const GetLimitedHotGoodsAction = (payload) => ({
  type: GET_LIMITED_GOT_GOODS,
  payload,
});
