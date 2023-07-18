import { useState, useEffect } from "react";
import { Input, Tabs } from "antd";
import axiosPublic from "../config/axios";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import {Table} from 'react-bootstrap';
import "../styles/AddRoom.css";

const { TabPane } = Tabs;

function Dashboard() {
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <Tabs >
        <TabPane tab="Customers" key="1">
          <Customers />
        </TabPane>

        <TabPane tab="Room Bookings" key="2">
          <Bookings />
        </TabPane>

        <TabPane tab="All Rooms" key="3">
          <Rooms />
        </TabPane>

        <TabPane tab="Add Rooms" key="4">
          <div className="AddRoom-content-wrapper bs">
            <AddRoom />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Dashboard;
// All Custommers.......................................................................................................................................................................
export function Customers() {
  const [customers, setcustomers] = useState([]);
  const [loading, setloarding] = useState(true);

  useEffect(() => {

    const getAllCustomers = async () => {
      try {
        const response = await axiosPublic.get('/customers');
        console.log(response.data);
        setcustomers(response.data.customers);
      } catch (error) {
        console.log(error);
      }
    }

    getAllCustomers();
    
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        <u>Registered Customers</u>
      </h1>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>User Name</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Gender</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(c => (
          <tr key={c._id}>
            <td>
              <img src={c.avatar} alt="image-0" style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%'}} />
            </td>
            <td>
              <p>{c.username}</p>
            </td>
            <td>
              <p>{c.firstName}</p>
            </td>
            <td>
              <p>{c.lastName}</p>
            </td>
            <td>
              <p>{c.phoneNumber}</p>
            </td>
            <td>
              <p>{c.gender}</p>
            </td>
            <td>
              <p>{c.email}</p>
            </td>
          </tr>
        ))}
        
        </tbody>
        </Table>
    </div>
  );
}

// All bookings.........................................................................................................................................................................

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloarding] = useState(true);

  useEffect(async () => {
    try {
      const data = await (
        await axios.get("http://localhost:5000/api/bookings/getallbookings")
      ).data;
      setbookings(data);
      setloarding(false);
    } catch (error) {
      console.log(error);
      setloarding(false);
    }
  }, [Input]);
  

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        <u>All Bookings</u>
      </h1>

      {loading && (
        <HashLoader
          color="#000"
          loading={loading}
          css=""
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {bookings.length && <h4>There are total {bookings.length} bookings.</h4>}

      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Room ID</th>
          <th>Room Number</th>
          <th>Check in Date</th>
          <th>Check out Date</th>
          <th>Total Amount</th>
          <th>Transaction ID</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map(b => (
          <tr key={b._id}>
            <td>
              <p>{b.roomid}</p>
            </td>
            <td>
              <p>{b.room}</p>
            </td>
            <td>
              <p>{b.checkin}</p>
            </td>
            <td>
              <p>{b.checkout}</p>
            </td>
            <td>
              <p>{b.totalamount}</p>
            </td>
            <td>
              <p>{b.transactionId}</p>
            </td>
            <td>
              <p>{b.status}</p>
            </td>
          </tr>
        ))}
        
        </tbody>
        </Table>


    </div>
  );
}

// All Rooms.......................................................................................................................................................................
export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setloarding] = useState(true);

  useEffect(async () => {
    try {
      const data = await (
        await axios.get("http://localhost:5000/api/rooms/getallrooms")
      ).data;
      setRooms(data);
      setloarding(false);
    } catch (error) {
      console.log(error);
      setloarding(false);
    }
  }, [Input]);
  

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        <u>All Rooms</u>
      </h1>

      {loading && (
        <HashLoader
          color="#000"
          loading={loading}
          css=""
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      

      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Room ID</th>
          <th>Room Number</th>
          <th>Max Count</th>
          <th>Rent Per Date</th>
          <th>Room Type</th>
          <th>Phone Number</th>
          
        </tr>
      </thead>
      <tbody>
        {rooms.map(r => (
          <tr key={r._id}>
            <td>
              <p>{r.id}</p>
            </td>
            <td>
              <p>{r.name}</p>
            </td>
            <td>
              <p>{r.maxcount}</p>
            </td>
            <td>
              <p>{r.rentperday}</p>
            </td>
            <td>
              <p>{r.type}</p>
            </td>
            <td>
              <p>{r.phonenumber}</p>
            </td>
            
          </tr>
        ))}
        
        </tbody>
        </Table>


    </div>
  );
}

// Add  Room.......................................................................................................................................................................
export function AddRoom() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        <u>Add Room</u>
      </h1>

      <hr></hr>

      <div className="row">
        <div className="col -md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Room Number"
          />
          <input
            type="text"
            className="form-control"
            placeholder="Rent Per Day"
          />
          <input type="text" className="form-control" placeholder="Max Count" />
          <input
            type="text"
            className="form-control"
            placeholder="Description"
          />
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
          />
        </div>

        <div className="col -md-4">
          <input type="text" className="form-control" placeholder="Type" />
          <input
            type="text"
            className="form-control"
            placeholder="Image URL 01"
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image URL 02"
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image URL 03"
          />
        </div>

        <hr></hr>

        <div>
          <button className="btn ">Add Room</button>
        </div>
      </div>
    </div>
  );
}
