const defaultState = {
    isModal: false,
    isSuccess: false,
    isCart: false,
    cart: {},
    isLogin: false,
    isRegister: false
  };
  
  const SET_MODAL = "SET_MODAL";
  const SET_SUCCESS = "SET_SUCCESS";
  const SET_CART = "SET_CART";
  const SET_LOGIN = "SET_LOGIN"
  const SET_REGISTER = "SET_REGISTER"
  
  export const modalSlice = (state = defaultState, action) => {
    switch (action.type) {
      case SET_MODAL:
        return { ...state, isModal: !state.isModal };
      case SET_SUCCESS:
        return {...state, isSuccess: !state.isSuccess};
      case SET_CART:
        return {...state, isCart: !state.isCart, cart: action.payload};
      case SET_LOGIN:
        return {...state, isLogin: !state.isLogin};
      case SET_REGISTER:
        return {...state, isRegister: !state.isRegister};
  
      default:
        return state;
    }
  };
  
  export const setModalAction = (payload) => ({ type: SET_MODAL, payload });
  export const setSuccessAction = (payload) => ({ type: SET_SUCCESS, payload });
  export const setCartAction = (payload) => ({ type: SET_CART, payload });
  export const setLoginAction = (payload) => ({ type: SET_LOGIN, payload });
  export const setRegisterAction = (payload) => ({ type: SET_REGISTER, payload });
  