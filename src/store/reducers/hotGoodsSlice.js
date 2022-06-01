const defaultState = {
  data: [],
  loading: true,
};

const GET_HOT_GOODS = "GET_HOT_GOODS";
const CHANGE_FAVORITE_HOT = "CHANGE_FAVORITE_HOT";
const GET_MORE_HOT_GOODS = "GET_MORE_HOT_GOODS";

export const hotGoodsSlice = (state = defaultState, action) => {
  switch (action.type) {
    case GET_HOT_GOODS:
      return { ...state, data: action.payload, loading: false };

    case GET_MORE_HOT_GOODS:
      const data = [...state.data, ...action.payload];
      return { ...state, data: data, loading: false };

    case CHANGE_FAVORITE_HOT:
      const index = state.data.findIndex(
        (item) => item.id == action.payload.id
      );
      state.data[index].isFavorite = false

      console.log(state.data)
      // console.log(state.data[index].isFavorite)
      // console.log(!state.data[index].isFavorite)

      return {
        ...state,
        data: state.data,
      };

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

export const ChangeFavoriteHotGoodsAction = (payload) => ({
  type: CHANGE_FAVORITE_HOT,
  payload,
});
