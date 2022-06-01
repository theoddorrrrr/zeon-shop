const defaultState = {
  data: [],
  loading: true,
};

const GET_BEST_SELLER_GOODS = "GET_BEST_SELLER_GOODS";
const GET_MORE_BEST_SELLER_GOODS =  "GET_MORE_BEST_SELLER_GOODS";

export const bestSellersSlice = (state = defaultState, action) => {
  switch (action.type) {
    case GET_BEST_SELLER_GOODS:
      return { ...state, data: action.payload, loading: false };

    case GET_MORE_BEST_SELLER_GOODS:
      const data = [...state.data, ...action.payload];
      return { ...state, data: data, loading: false };

    default:
      return state;
  }
};

export const GetBestSellersGoodsAction = (payload) => ({
  type: GET_BEST_SELLER_GOODS,
  payload,
});

export const GetMoreBestSellersGoodsAction = (payload) => ({
  type: GET_MORE_BEST_SELLER_GOODS,
  payload,
});


