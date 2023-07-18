import { useState, useEffect } from "react";
import { Tabs } from "antd";
import axiosPublic from "../config/axios";

import { toast } from "react-toastify";
import useAuthContext from "../hooks/useAuthContext";
import "../styles/profile.css";

import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdAddAPhoto,
  MdDeleteForever,
} from "react-icons/md";
import {
  FaMale,
  FaFemale,
  FaCalendarAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import axios from "axios";
import { Bookings } from "./Dashboard";

const { TabPane } = Tabs;

function ProfileScreen() {
  return (
    <div className="ml-3 mt-3 mr-3 bs">
      <Tabs>
        <TabPane tab="Profile" key="1">
          <MyProfile />
        </TabPane>

        <TabPane tab="My Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;

// My Profile.......................................................................................................................................................................
export function MyProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const { auth } = useAuthContext();

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axiosPublic.get(`/profile/${auth.user?.id}`);
        console.log(response.data);
        setProfile(response.data?.user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getProfileData();
  }, [auth]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        <u>My Profile</u>
      </h1>
      <br />
      <hr />

      <div className="profilePage-right">
        <div className="profilePage-right-avatar">
          <img src={profile.avatar} alt={profile.username} />
        </div>

        <span>#{profile.username}</span>

        <h1>
          {profile.firstName} {profile.lastName}
        </h1>

        <p>{profile.role}</p>

        <ul>
          <li>
            <MdEmail />
            <span>{profile.email}</span>
          </li>
          <li>
            <MdPhone />
            <span>{profile.phoneNumber}</span>
          </li>
          <li>
            <MdLocationOn />
            <span>
              {profile.address}, {profile.street}, {profile.city}
            </span>
          </li>
          <li>
            {profile.gender === "male" ? <FaMale /> : <FaFemale />}
            <span>{profile.gender === "male" ? "Male" : "Female"}</span>
          </li>
          {(profile.role === "Employee" || profile.role === "Admin") && (
            <>
              <li>
                <FaCalendarAlt />
                <span>{profile.age} years old</span>
              </li>
              <li>
                <FaMoneyCheckAlt />
                <span>LKR {profile.salary.toFixed(2)}</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
// My Bookings.......................................................................................................................................................................
export function MyBookings() {
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState({});
  const { auth } = useAuthContext();

  useEffect(() => {
    const getBookingData = async () => {
      try {
        const response = await axiosPublic.get(`/profile/${auth.user?.id}`);
        console.log(response.data);
        setBooking(response.data?.user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getBookingData();
  }, [auth]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        <u>My Bookings</u>
      </h1>

      <div className="row">
        <div className="col-md-6">
          {booking &&
            booking.map((booking) => {
              return;
              <div className="bs">
                <h2>booking.room</h2>
                <p><b>BookingID</b> : {booking._id}</p>
                <p><b>CheckIn</b> : {booking.checkin}</p>
                <p><b>CheckOut</b> : {booking.checkout}</p>
                <p><b>Amount</b> : {booking.totalamount}</p>
                <p><b>Status</b> : {booking.status == 'booked' ? 'Confirm' : 'Canceled'}</p>
              </div>;
            })}
        </div>
      </div>
    </div>
  );
}
