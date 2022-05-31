const defaultState = JSON.parse(localStorage.getItem("hotGoods"))
  ? JSON.parse(localStorage.getItem("hotGoods"))
  : {
      data: [],
      loading: true,
      loadMore: false,
    };

const GET_HOT_GOODS = "GET_HOT_GOODS";
const CHANGE_FAVORITE = "CHANGE_FAVORITE";
const GET_SAVED_HOT_GOODS = "GET_SAVED_HOT_GOODS";
const GET_MORE_HOT_GOODS = "GET_MORE_HOT_GOODS"
const LOAD_MORE = "LOAD_MORE"

export const hotGoodsSlice = (state = defaultState, action) => {
  switch (action.type) {
    case GET_HOT_GOODS:
      return {...state, data: action.payload, loading: false}

      case GET_MORE_HOT_GOODS:
        const data = [...state.data, ...action.payload]
        return {...state, data: data, loading: false}

    case CHANGE_FAVORITE:
      const index = state.data.findIndex(
        (item) => item.id == action.payload.id
      );
      state.data[index].isFavorite = !state.data[index].isFavorite;

      return {
        ...state,
        data: state.data,
      };

    case LOAD_MORE:
      return {...state, loadMore: action.payload}


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

export const LoadMore = (payload) => ({
  type: LOAD_MORE,
  payload,
});

export const ChangeFavoriteAction = (payload) => ({
  type: CHANGE_FAVORITE,
  payload,
});

export const getSavedHotGoodAction = (payload) => ({
  type: GET_SAVED_HOT_GOODS,
  payload,
});
