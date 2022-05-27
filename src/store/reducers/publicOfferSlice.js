const defaultState = {
  data: {},
  loading: true,
};

const SET_PULIC_OFFER = "SET_PULIC_OFFER";

export const publicOfferSlice = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PULIC_OFFER:
      return { ...state, data: action.payload, loading: false };

    default:
      return state;
  }
};

export const GetPublicOfferAction = (payload) => ({
  type: SET_PULIC_OFFER,
  payload,
});
