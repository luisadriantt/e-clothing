import React from "react";
import { useQuery } from "@apollo/client";

import { cartHiddenVar } from "../../graphql/cache";
import { GET_CART_ITEMS_COUNT } from "../../graphql/queries";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { data } = useQuery(GET_CART_ITEMS_COUNT);
  const { cartItemsCount } = data;

  return (
    <div
      className="cart-icon"
      onClick={() => {
        cartHiddenVar(!cartHiddenVar());
      }}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartItemsCount}</span>
    </div>
  );
};

export default CartIcon;
