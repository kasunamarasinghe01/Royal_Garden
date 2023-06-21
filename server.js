const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//conecting database...
const connectDB = require("./db");
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

//conecting rooms...
const roomsRoutes = require("./routes/roomsRoutes");
const authRoutes = require("./routes/authRoutes");
const bookingsRoute = require("./routes/bookingRoutes");

app.use("/api/rooms", roomsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingsRoute);
app.use("/api/profile", require('./routes/profileRoutes'));
app.use("/api/customers", require('./routes/customerRoutes'));
app.use("/api/employees", require('./routes/employeeRoutes'));
// app.use("/api/bookings", require('./routes/bookingRoutes'));

const port = process.env.PORT || 5000;

mongoose.connection.on("open", () => {
  console.log("Connection to MongoDB success");
  app.listen(port, () => console.log(`Node server started using nodemon`));
});
