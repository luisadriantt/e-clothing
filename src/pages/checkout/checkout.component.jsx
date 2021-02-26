import React, { useContext } from "react";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import { CartContext } from "../../providers/cart/cart.provider";

import "./checkout.styles.scss";

const CheckoutPage = () => {
  const { cartItems, totalPriceCount } = useContext(CartContext);

  return (
    <div className="checkout-page">
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
        <span> TOTAL ${totalPriceCount}</span>
      </div>
      <div className="test-warning">
        For Testing:
        <br></br>
        <h3>4242424242424242 </h3>
      </div>
      <StripeCheckoutButton price={totalPriceCount} />
    </div>
  );
};

export default CheckoutPage;
