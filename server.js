const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/pay", async (req, res) => {
  const { phone, amount } = req.body;

  // 1. Get access token
  const token = "YOUR_ACCESS_TOKEN";

  // 2. Send STK Push
  const response = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      BusinessShortCode: "YOUR_SHORTCODE",
      Password: "YOUR_PASSWORD",
      Timestamp: "YYYYMMDDHHMMSS",
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: "YOUR_SHORTCODE",
      PhoneNumber: phone,
      CallBackURL: "https://yourdomain.com/callback",
      AccountReference: "ManlungStore",
      TransactionDesc: "Payment"
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  res.json(response.data);
});

app.listen(3000, () => console.log("Server running"));
