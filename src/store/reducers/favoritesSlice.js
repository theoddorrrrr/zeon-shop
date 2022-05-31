const defaultState = JSON.parse(localStorage.getItem("favorites"))
  ? JSON.parse(localStorage.getItem("favorites"))
  : [];
const SET_FAVORITES = "SET_FAVORITES";
const SET_UNFAVORITES = "SET_UNFAVORITES";

export const favoritesSlice = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FAVORITES:
      console.log(state);
      return [...state, action.payload];

    case SET_UNFAVORITES:
      return [...state.filter((good) => good.id !== action.payload.id)];

    default:
      return state;
  }
};

export const setFavorites = (payload) => ({ type: SET_FAVORITES, payload });
export const setUnFavorites = (payload) => ({ type: SET_UNFAVORITES, payload });
