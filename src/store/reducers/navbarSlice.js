const defaultState = {
  isNavbar: false,
  isFixed: false,
};

const SET_IS_NAVBAR = "SET_IS_NAVBAR";

export const navbarSlice = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IS_NAVBAR:
      return { ...state, isFixed: !action.payload, isNavbar: !action.payload };

    default:
      return state;
  }
};

export const setIsNavbarAction = (payload) => ({ type: SET_IS_NAVBAR, payload });
