const express = require("express");
const app = express();
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST); //STRIPE_SECRET_LIVE
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

server.get("/", (req, res) => {
  res.send("Hello, Mr. AK!");
});

app.post("/stripe/charge", cors(), async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let {
    amount,
    id,
    currency,
    //  receipt_email
  } = req.body;
  console.log(
    "stripe-routes.js 10 | amount and id",
    amount,
    currency,
    id
    // receipt_email
  );
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
      // receipt_email: receipt_email,
    });
    console.log("stripe-routes.js 19 | payment", payment);
    res.json({
      message: "Payment Successful",
      success: true,
    });
    // console.log("f o r m:", form);
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started...");
});
