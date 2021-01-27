import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart], // Collection of input selector
  (cart) => cart.cartItems // Input selector's function
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (previusValue, cartItem) => previusValue + cartItem.quantity,
      0
    )
);
