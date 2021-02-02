import React from "react";
import StripeCheckout from "react-stripe-checkout";

// TODO: use new stripe version
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IGC5cGnGOCAgE0WdngFstEcqqRJU221LvEZFoaT16pyEgVKnsEb0CDN7MbE2vBfSx6aGXa9G6wERgIv8uFXhv4s00JLa2cO97";

  const onToken = (token) => {
    console.log(token);
    alert("pago exitoso");
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
