const defaultState = localStorage.getItem("123")
  ? JSON.parse(localStorage.getItem("123"))
  : []

const SET_FAVORITES = "SET_FAVORITES";
const SET_UNFAVORITES = "SET_UNFAVORITES";

export const favoritesSlice = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FAVORITES:
      console.log('FAV');
      localStorage.setItem("123", JSON.stringify([...state, action.payload]));
      return [...state, action.payload];

    case SET_UNFAVORITES:
      console.log('UNF');
      localStorage.setItem(
        "123",
        JSON.stringify([
          ...state.filter((good) => good.id !== action.payload.id),
        ])
      );

      return [...state.filter((good) => good.id !== action.payload.id)];

    default:
      return state;
  }
};

export const setFavorites = (payload) => ({ type: SET_FAVORITES, payload });
export const setUnFavorites = (payload) => ({ type: SET_UNFAVORITES, payload });
