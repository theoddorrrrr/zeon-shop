const defaultState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREMENT_CART = "INCREMENT_CART";
const DECREMENT_CART = "DECREMENT_CART";

export const cartSlice = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      localStorage.setItem("cart", JSON.stringify([...state, action.payload]));
      return [...state, action.payload];

    case REMOVE_FROM_CART:
      const index = state.findIndex(
        (good) =>
          good.id == action.payload.id &&
          good.selectedColor == action.payload.selectedColor
      );
      const cloneCardGoods = [...state];
      cloneCardGoods.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify([...cloneCardGoods]));
      return [...cloneCardGoods];

    case INCREMENT_CART:
      const newIncrementState = state.map((good) => {
        const newGood = { ...good };
        if (
          good.id == action.payload.id &&
          good.selectedColor == action.payload.selectedColor
        ) {
          newGood.count = good.count + 1;
        }
        return newGood;
      });

      localStorage.setItem("cart", JSON.stringify(newIncrementState));
      return newIncrementState;

    case DECREMENT_CART:
      if (action.payload.count <= 1) {
        return state;
      } else {
        const newDecrementState = state.map((good) => {
          const newGood = { ...good };
          if (
            good.id == action.payload.id &&
            good.selectedColor == action.payload.selectedColor
          ) {
            newGood.count = good.count - 1;
          }
          return newGood;
        });

        localStorage.setItem("cart", JSON.stringify(newDecrementState));
        return newDecrementState;
      }

    default:
      return state;
  }
};

export const addToCart = (payload) => ({ type: ADD_TO_CART, payload });
export const removeFromCart = (payload) => ({
  type: REMOVE_FROM_CART,
  payload,
});
export const incrementCart = (payload) => ({ type: INCREMENT_CART, payload });
export const decrementCart = (payload) => ({ type: DECREMENT_CART, payload });
