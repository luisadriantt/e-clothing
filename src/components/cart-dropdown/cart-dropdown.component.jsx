import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";

import { cartHiddenVar } from "../../graphql/cache";
import { GET_CART_ITEMS } from "../../graphql/queries";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ history }) => {
  const { data } = useQuery(GET_CART_ITEMS);

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {data.cartItems.length ? (
          data.cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          cartHiddenVar(!cartHiddenVar());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
