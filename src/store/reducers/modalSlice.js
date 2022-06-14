const defaultState = {
    isModal: false
  };
  
  const SET_MODAL = "SET_MODAL";
  
  export const modalSlice = (state = defaultState, action) => {
    switch (action.type) {
      case SET_MODAL:
        console.log('state');
        return { ...state, isModal: !state.isModal };
  
      default:
        return state;
    }
  };
  
  export const setModalAction = (payload) => ({ type: SET_MODAL, payload });
  