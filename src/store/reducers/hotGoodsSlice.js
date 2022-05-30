const defaultState = {
  data: [],
  loading: true,
};

const GET_HOT_GOODS = "GET_HOT_GOODS";
const CHANGE_FAVORITE = "CHANGE_FAVORITE";

export const hotGoodsSlice = (state = defaultState, action) => {
  switch (action.type) {
    case GET_HOT_GOODS:
      const data = action.payload.map(item => {
        return {...item, isFavorite: false}
      })

      return { ...state, data: data, loading: false };

    case CHANGE_FAVORITE:
      console.log(action.payload);
      const index = state.data.findIndex(item => item.id == action.payload.id);
      state.data[index].isFavorite = !state.data[index].isFavorite

      return { 
       state, 
       data: state.data
      }
      
    default:
      return state;
  }
};

export const GetHotGoodsAction = (payload) => ({
  type: GET_HOT_GOODS,
  payload,
});

export const ChangeFavoriteAction = (payload) => ({
  type: CHANGE_FAVORITE,
  payload,
});
