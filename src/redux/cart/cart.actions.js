import CartActionTypes from "./cart.types";

// Payload is optional
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});
