import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

// TODO: use new stripe version
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment successful");
      })
      .catch((error) => {
        console.log("payment error: ", error);
        alert("There was an error");
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
