const defaultState = {
    data: [],
    loading: true,
  };
  
  const GET_COLLECTION = "GET_COLLECTION";
  
  export const oneCollectionSlice = (state = defaultState, action) => {
    switch (action.type) {
      case GET_COLLECTION:
        return { ...state, data: action.payload, loading: false };
  
      default:
        return state;
    }
  };
  
  export const GetOneCollectionsAction = (payload) => ({
    type: GET_COLLECTION,
    payload,
  });
  

  
  
  