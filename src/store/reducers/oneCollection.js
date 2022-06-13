const defaultState = {
    data: [],
    paginated: [],
    loading: true,
  };
  
  const GET_COLLECTION = "GET_COLLECTION";
  const GET_PAGINATED_ONE_COLLECTIONS = "GET_PAGINATED_ONE_COLLECTIONS";
  
  export const oneCollectionSlice = (state = defaultState, action) => {
    switch (action.type) {
      case GET_COLLECTION:
        return { ...state, data: action.payload, loading: false };

        case GET_PAGINATED_ONE_COLLECTIONS:
          state.paginated = []
          return { ...state, paginated: action.payload };
  
      default:
        return state;
    }
  };
  
  export const GetOneCollectionsAction = (payload) => ({
    type: GET_COLLECTION,
    payload,
  });
  export const GetPaginatedOneCollectionAction = (payload) => ({
    type: GET_PAGINATED_ONE_COLLECTIONS,
    payload,
  });
  

  
  
  