const defaultState = {
    data: [],
    all: [],
    loading: true,
  };
  
  const GET_COLLECTIONS = "GET_COLLECTIONS";
  const GET_COLLECTIONS_MORE =  "GET_COLLECTIONS_MORE";
  const GET_ALL_COLLECTIONS =  "GET_ALL_COLLECTIONS";
  
  export const collectionsSlice = (state = defaultState, action) => {
    switch (action.type) {
      case GET_COLLECTIONS:
        return { ...state, data: action.payload, loading: false };
  
      case GET_COLLECTIONS_MORE:
        const data = [...state.data, ...action.payload];
        return { ...state, data: data, loading: false };

      case GET_ALL_COLLECTIONS:
        return { ...state, all: action.payload, loading: false };


  
      default:
        return state;
    }
  };
  
  export const GetCollectionsAction = (payload) => ({
    type: GET_COLLECTIONS,
    payload,
  });
  
  export const GetMoreCollections = (payload) => ({
    type: GET_COLLECTIONS_MORE,
    payload,
  });
  
  export const GetAllCollections = (payload) => ({
    type: GET_ALL_COLLECTIONS,
    payload,
  });
  
  
  