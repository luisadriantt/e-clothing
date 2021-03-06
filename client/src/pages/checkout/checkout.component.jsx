import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeForm from "../../components/stripe-payment-form/stripe-form";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import "./checkout.styles.scss";

const CheckoutPage = ({ cartItems, total }) => {
  return (
    <div className="checkout-page">
      <div className="row">
        <div className="double-column">
          <div className="checkout-header">
            <div className="header-block">
              <span>Product</span>
            </div>
            <div className="header-block">
              <span>Description</span>
            </div>
            <div className="header-block">
              <span>Quantity</span>
            </div>
            <div className="header-block">
              <span>Price</span>
            </div>
            <div className="header-block">
              <span>Remove</span>
            </div>
          </div>

          {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem}></CheckoutItem>
          ))}
          <div className="total">
            <span> TOTAL ${total}</span>
          </div>
        </div>
        <div className="column">
          <div className="payment-column">
            <h1> Payment </h1>
            <StripeForm total={total} />
            <h3>Test card: 4242 4242 4242 4242</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
