const defaultState = {
    email: null,
    id: null,
    token: null
};

const SET_USER = "SET_USER";
const REMOVE_USER = "REMOVE_USER";
// const GET_ABOUT_US = "GET_ABOUT_US";

export const userSlice = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                email: action.payload.email,
                id: action.payload.id,
                token: action.payload.token
            };
        case REMOVE_USER:
            return {
                ...state,
                email: null,
                id: null,
                token: null
            };

        default:
            return state;
    }
};

export const setUserAction = (payload) => ({ type: SET_USER, payload });
export const removeUserAction = (payload) => ({ type: REMOVE_USER, payload });


