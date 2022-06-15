const defaultState = {
    isModal: false,
    isSuccess: false,
    isCart: false
  };
  
  const SET_MODAL = "SET_MODAL";
  const SET_SUCCESS = "SET_SUCCESS";
  const SET_CART = "SET_CART";
  
  export const modalSlice = (state = defaultState, action) => {
    switch (action.type) {
      case SET_MODAL:
        return { ...state, isModal: !state.isModal };
      case SET_SUCCESS:
        return {...state, isSuccess: !state.isSuccess};
      case SET_CART:
        return {...state, isCart: !state.isCart};
  
      default:
        return state;
    }
  };
  
  export const setModalAction = (payload) => ({ type: SET_MODAL, payload });
  export const setSuccessAction = (payload) => ({ type: SET_SUCCESS, payload });
  export const setCartAction = (payload) => ({ type: SET_CART, payload });
  