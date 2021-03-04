const express = require("express");
const app = express();
const port = process.env.PORT || 4242;
const path = require("path");
// const compression = require("compression");

if (process.env.NODE_ENV !== "production") require("dotenv").config();
// This is your real test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(express.static("."));
app.use(express.json());
// app.use(compression);

if (process.env.NODE_ENV === "production") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
