import React, { useState, useEffect } from "react";
import axiosPublic from "../config/axios";
import { DatePicker } from "antd";
//import 'antd/dist/antd.css';
import moment from "moment";
import dayjs from "dayjs";
import "../styles/searchBar.css";

import { Spinner } from "react-bootstrap";
import Room from "../components/Room";
import Loader from "../components/Loader";
import HashLoader from "react-spinners/HashLoader";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function RoomScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(true);

  const [checkin, setCheckIn] = useState();
  const [checkout, setCheckOut] = useState();

  const [searchkey, setsearchkey] = useState();
  const [type, settype] = useState("all");
  const [duplicaterooms, setDuplicateRooms] = useState([]);

  useEffect(() => {
    const getAllRoomsData = async () => {
      try {
        const response = await axiosPublic.get("/rooms/getallrooms");
        console.log(response.data.rooms);
        setRooms(response.data.rooms);
        setDuplicateRooms(response.data.rooms);
        setLoading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setLoading(false);
      }
    };

    getAllRoomsData();
  }, []);

  function filterByDate(dates, datesString) {
    setCheckIn(dayjs(dates[0]).format("DD-MM-YYYY"));
    setCheckOut(dayjs(dates[1]).format("DD-MM-YYYY"));

    var temproom = [];
    var availability = false;

    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !dayjs(dayjs(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.checkin,
              booking.checkout
            ) &&
            !dayjs(dayjs(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.checkin,
              booking.checkout
            )
          ) {
            if (
              dayjs(dates[0]).format("DD-MM-YYYY") !== booking.checkin &&
              dayjs(dates[0]).format("DD-MM-YYYY") !== booking.checkout &&
              dayjs(dates[1]).format("DD-MM-YYYY") !== booking.checkin &&
              dayjs(dates[1]).format("DD-MM-YYYY") !== booking.checkout
            ) {
              availability = true;
            }
          }
        }
      }

      if (availability == true || room.currentbookings.length == 0) {
        temproom.push(room);
      }

      setRooms(temproom);
    }

    console.log(datesString);
  }

  function filterBySearch() {
    const temprooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setRooms(temprooms);
  }

  function filterByType(e) {
    if (e !== "all") {
      const temprooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );

      setRooms(temprooms);
    } else {
      setRooms(duplicaterooms);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="from-control"
            placeholder="  Search Rooms"
            value={setsearchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>

        <div
          className="col-md-3"
          value={type}
          on
          onChange={(e) => {
            filterByType(e.target.value);
          }}
        >
          <select>
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non Delux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <HashLoader
            color="#000"
            loading={loading}
            css=""
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} checkin={checkin} checkout={checkout} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default RoomScreen;
