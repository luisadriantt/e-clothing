import { InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);
export const cartHiddenVar = makeVar(true);
export const cartItemsVar = makeVar([]);
export const cartItemsCountVar = makeVar(0);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        cartHidden: {
          read() {
            return cartHiddenVar();
          },
        },
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
        cartItemsCount: {
          read() {
            return cartItemsCountVar();
          },
        },
      },
    },
  },
});
