const express = require("express");
const router = express.Router();
// const { getAllBookings } = require('../controlers/bookingControllers');
const Booking = require("../models/booking");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51N7xrODI42ZwY3wga4LdZop5Wyp4Z2WPzFBWRu5DpABO7U6ZbjFGxUIbjyCI8lmHF0yLGulaO0gSSw8sXmx5zHdj00uO9JezkQ"
);

// router.get('/', getAllBookings);

router.post("/bookingscreen/bookroom", async (req, res) => {
  const { room, userid, checkin, checkout, totalamount, totaldays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "LKR",
        receipt_email: token.email,
      },
      {
        idempotenceyKey: uuidv4(),
      }
    );
    if (payment) {
      const newbooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        checkin: dayjs(params.checkin, "DD-MM-YYYY"),
        checkout: dayjs(params.checkout, "DD-MM-YYYY"),
        totalamount,
        totaldays,
        transactionId: "1234",
      });

      await newbooking.save();
    }

    res.send("Payment Successful, Your Room is booked.");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getBookingData", async (req, res) => {
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
