const defaultState = {
  id: null,
  cart: [],
  favorites: [],
  orders: [],
};

const SET_USER_STATE = "SET_USER_STATE";

export const userStateSlice = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_STATE:
      return {
        ...state,
        id: action.payload.id,
        cart: action.payload.cart,
        favorites: action.payload.favorites,
        orders: action.payload.orders,
      };

    default:
      return state;
  }
};

export const setUserStateAction = (payload) => ({
  type: SET_USER_STATE,
  payload,
});
