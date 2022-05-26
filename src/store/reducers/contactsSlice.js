const defaultState = {
    contacts: {},
    loading: true
};
  
  const GET_CONTACTS = "GET_CONTACTS";
  
  export const contactsSlice = (state = defaultState, action) => {
    switch (action.type) {
      case GET_CONTACTS:
        return {...state, contacts: action.payload, loading: false}
  
      default:
        return state;
    }
  };
  
  export const GetContactsAction = (payload) => ({ type: GET_CONTACTS, payload });
  