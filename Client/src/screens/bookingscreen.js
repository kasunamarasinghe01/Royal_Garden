import React, { useState, useEffect } from "react";
import { Carousel, Spinner, Button } from "react-bootstrap";
import { Await, useParams } from "react-router-dom";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";

import axiosPublic from "../config/axios";
import Loader from "../components/Loader";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

function BookingScreen() {
  const { auth } = useAuthContext();
  //const {auth, dispatch} = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(true);
  const [room, setRoom] = useState({});

  const params = useParams();

  const checkin = dayjs(params.checkin, "DD-MM-YYYY");
  const checkout = dayjs(params.checkout, "DD-MM-YYYY");

  const totaldays = dayjs.duration(checkout.diff(checkin)).as("day") + 1;

  const totalamount = totaldays * room.rentperday;

  useEffect(() => {
    const getSingleRoomData = async () => {
      console.log(params.roomid);
      try {
        const response = await axiosPublic.get(
          `/rooms/getroombyid/${params.roomid}`
        );
        // settotalmount( room.rentperday*totaldays)
        setLoading(false);
        setRoom(response.data.room);
        console.log(response);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getSingleRoomData();
  }, [axiosPublic, params.roomid]);



  async function onToken(token) {
    console.log(token);
    console.log(auth.user);
    const bookingDetails = {
      room,
      userid: auth.user.id,
      checkin : dayjs(params.checkin, "DD-MM-YYYY"),
      checkout : dayjs(params.checkout, "DD-MM-YYYY"),
      totalamount,
      totaldays,
      token,
    };
    console.log(bookingDetails);
    try {
      const result = await axios.post("http://localhost:5000/api/bookings/bookingscreen/bookroom",
        JSON.stringify(bookingDetails),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <div className="row justify-content-center mt-5">
          <HashLoader
            color="#000"
            loading={loading}
            css=""
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <React.Fragment>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1 style={{ textAlign: "center" }}>Room Number : {room.name}</h1>

              <Carousel>
                {room?.imageurls.map((url) => (
                  <Carousel.Item>
                    <img className="d-block w-100 bigimg" src={url} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="col-md-6">
              <h2 style={{ textAlign: "center" }}>Booking Details</h2>
              <hr />

              <div>
                <p>
                  <b>Name : </b>
                  {auth.user?.username}
                </p>
                <p>
                  <b>Check In : </b>
                  {params.checkin}
                </p>
                <p>
                  <b>Check Out : </b>
                  {params.checkout}
                </p>
                <p>
                  <b>Max Count : </b>
                  {room.maxcount}
                </p>
              </div>

              <div>
                <h2 style={{ textAlign: "center" }}>Amount</h2>
                <hr />

                <div>
                  <p>
                    <b>Total Days :</b>
                    {totaldays}
                  </p>
                  <p>
                    <b>Rent per Day : </b>
                    {room.rentperday}/=
                  </p>
                  <p>
                    <b>
                      Total Amount : <u>Rs.{totalamount}/=</u>
                    </b>
                  </p>
                </div>
              </div>

              <div style={{ float: "right" }}>
                ,
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="LKR"
                  stripeKey="pk_test_51N7xrODI42ZwY3wgWoJd4skXuAWJnPsIIyTzHL7y5zP1ZYnkOM56sF99BMeycDJV5AGdnP4MDJWQQtLVlPqKJhGF00VCSBDLob"
                >
                  <Button variant="dark">Pay Now</Button>

                </StripeCheckout>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default BookingScreen;
