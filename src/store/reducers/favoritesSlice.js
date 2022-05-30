const defaultState = [
    {hotGoods: JSON.parse(localStorage.getItem('hotGoods'))}
];
  console.log(defaultState);
  const SET_FAVORITES = "SET_FAVORITES"
  const SET_UNFAVORITES = "SET_UNFAVORITES"
  
  export const favoritesSlice = (state = defaultState, action) => {
    switch (action.type) {
      case SET_FAVORITES:
        return [ ...state, action.payload]

        case SET_UNFAVORITES:
            return [...state, action.payload]
  
      default:
        return state;
    }
  };
  
  export const setFavorites = (payload) => ({ type: SET_FAVORITES, payload });
  export const setUnFavorites = (payload) => ({ type: SET_UNFAVORITES, payload });
  