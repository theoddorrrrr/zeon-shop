const defaultState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const cartSlice = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      //   console.log(action);
      localStorage.setItem("cart", JSON.stringify([...state, action.payload]));
      return [...state, action.payload];

    case REMOVE_FROM_CART:
    //   console.log(state);
    //   console.log(action.payload.selectedColor);

      const newState = [
        ...state.filter(good => good.id !== action.payload.id && good.selectedColor === action.payload.selectedColor)
      ];

      console.log(newState);

      return state;

      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...state.filter(
            (good) =>
              good.id !== action.payload.id &&
              good.selectedColor === action.payload.selectedColor
          ),
          //   ...state.filter((good) => good.id !== action.payload.id && good.selectedColor == action.payload.selectedColor),
        ])
      );

      return [
        ...state.filter(
          (good) =>
            good.id !== action.payload.id &&
            good.selectedColor === action.payload.selectedColor
        ),
      ];
    //   return [...state.filter((good) => good.id !== action.payload.id && good.selectedColor == action.payload.selectedColor)];

    default:
      return state;
  }
};

export const addToCart = (payload) => ({ type: ADD_TO_CART, payload });
export const removeFromCart = (payload) => ({
  type: REMOVE_FROM_CART,
  payload,
});
