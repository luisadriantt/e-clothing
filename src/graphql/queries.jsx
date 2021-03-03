import { gql } from "@apollo/client";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
export const GET_CART_HIDDEN = gql`
  query IsCartHidden {
    cartHidden @client
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export const GET_CART_ITEMS_COUNT = gql`
  query GetCartItemsCount {
    cartItemsCount @client
  }
`;
