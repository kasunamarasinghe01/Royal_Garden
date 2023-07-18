import { useState, useEffect } from "react";
import { Form, FloatingLabel, Spinner, Table } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdAddAPhoto, MdDeleteForever, MdPersonAdd } from "react-icons/md";
import { Tabs } from "antd";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
import React, { useRef } from "react";

import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import axiosPublic from "../config/axios";
import axios from "axios";

import { toast } from "react-toastify";

import "../styles/employeeList.css";
import "../styles/register.css";
import useAuthContext from "../hooks/useAuthContext";

const { TabPane } = Tabs;

function EmpManScreen() {
  // Employee Registration

  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <Tabs>
        <TabPane tab="Employee" key="1">
          <EmpList />
        </TabPane>

        <TabPane tab="Emp Registration" key="2">
          <AddEmployee />
        </TabPane>
      </Tabs>
      {/* <Tabs>
        <Tab eventKey="employee" title="Employee">
          <EmpList />
        </Tab>
        <Tab eventKey="emp-registration" title="Emp Registration">
          <AddEmployee />
        </Tab>
      </Tabs> */}
    </div>
  );
}

export default EmpManScreen;

// All Employee.......................................................................................................................................................................
export function EmpList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setloarding] = useState(true);

  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        const response = await axiosPublic.get("/employees");
        console.log(response.data);
        setEmployees(response.data.employees);
      } catch (error) {
        console.log(error);
      }
    };

    getAllEmployees();
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        <u>All Employee</u>
      </h1>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Emp Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Gender</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e._id}>
              <td>
                <img
                  src={e.avatar}
                  alt="image-0"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>
                <p>{e.username}</p>
              </td>
              <td>
                <p>{e.firstName}</p>
              </td>
              <td>
                <p>{e.lastName}</p>
              </td>
              <td>
                <p>{e.age}</p>
              </td>
              <td>
                <p>{e.salary}</p>
              </td>
              <td>
                <p>{e.gender}</p>
              </td>
              <td>
                <p>{e.email}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

// Add New Employee.......................................................................................................................................................................
export function AddEmployee() {
  const { auth } = useAuthContext();

  const avatarInputRef = useRef();

  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // form fields state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(0);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("Employee");

  const handleAvatarSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      // use file reader and convert the file into a data url
      const reader = new FileReader();
      reader.onload = () => {
        setFile(file);
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarRemove = () => {
    setFile(null);
    setAvatar(null);
  };

  const handleRegister = async () => {
    setLoading(true);

    if (
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !street ||
      !city ||
      !gender ||
      !role ||
      age === 0 ||
      salary === 0
    ) {
      toast.error("All fields are requried");
      setLoading(false);
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      // display error message saying that passwords aren't match
      toast.error("passwords do not match");
      setLoading(false);
      return;
    }

    const employee = {
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNumber: phone,
      address,
      street,
      city,
      gender,
      age,
      salary,
      role,
      avatar: null,
    };

    // if an avatar has been selected, upload it to firebase & get the url
    let url = null;
    if (file && avatar) {
      // upload image to firebase
      const imageRef = ref(storage, `/avatar/${uuidv4()}`);

      try {
        const snapshot = await uploadBytes(imageRef, file);
        url = await getDownloadURL(snapshot.ref);
        employee.avatar = url;
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const response = await axiosPublic.post(
        "/employees",
        JSON.stringify(employee)
      );
      toast.success("Employee added");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error adding employee");
      setLoading(false);
    }

    console.log(employee);
  };

  return (
    <div className="bs">
      <h1 style={{ textAlign: "center" }}>
        <u>Employee Registration</u>
      </h1>

      <div className="registerPage">
        <div className="registerPage-content-wrapper">
          <div className="registerPage-content" style={{ textAlign: "center" }}>
            {/* <span className='registerPage-content-vertical-line'></span> */}

            <div className="registerPage-content-left">
              <div className="registerPage-content-left-avatar">
                <div>
                  {!avatar && !file && <span>No Avatar</span>}
                  {file && avatar && <img src={avatar} alt="avatar" />}
                </div>
                <p>
                  <input
                    type="file"
                    accept="image/jpeg"
                    ref={avatarInputRef}
                    onChange={handleAvatarSelect}
                  />
                  <button
                    title="add avatar"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <MdAddAPhoto />
                  </button>
                  {file && avatar && (
                    <button title="remove avatar" onClick={handleAvatarRemove}>
                      <MdDeleteForever />
                    </button>
                  )}
                </p>
              </div>

              <FloatingLabel
                controlId="username"
                label="Employee Number"
                className="mb-4"
              >
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="Password"
                label="Password"
                className="mb-4"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="confirmPassword"
                label="Confirm Password"
                className="mb-4"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FloatingLabel>
              <div className="d-flex align-items-center gap-2">
                <FloatingLabel controlId="Age" label="Age" className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="Salary"
                  label="Salary"
                  className="mb-4"
                >
                  <Form.Control
                    type="number"
                    placeholder="Salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </FloatingLabel>
              </div>
            </div>

            <div className="registerPage-content-right">
              <div className="d-flex align-items-center gap-2">
                <FloatingLabel
                  controlId="First Name"
                  label="First Name"
                  className="mb-4"
                >
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="Last Name"
                  label="Last Name"
                  className="mb-4"
                >
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FloatingLabel>
              </div>

              <FloatingLabel controlId="Email" label="Email" className="mb-4">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="Phone No."
                label="Phone"
                className="mb-4"
              >
                <Form.Control
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="Address"
                label="Address"
                className="mb-4"
              >
                <Form.Control
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FloatingLabel>

              <div className="d-flex align-items-center gap-2">
                <FloatingLabel
                  controlId="Street"
                  label="Street"
                  className="mb-4"
                >
                  <Form.Control
                    type="text"
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="City" label="City" className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FloatingLabel>
              </div>

              <div className="px-3 py-2 border rounded">
                <label className="mb-2">Gender</label>
                <div className="d-flex align-items-center gap-4">
                  <Form.Check
                    type="radio"
                    label="Male"
                    value="male"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    value="female"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>

              <div className="px-3 py-2 border rounded">
                <label className="mb-2">Employee Role</label>
                <div className="d-flex align-items-center gap-4">
                  <Form.Check
                    type="radio"
                    label="Employee"
                    value="Employee"
                    name="role"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Admin"
                    value="Admin"
                    name="role"
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
              </div>

              {/* <div className='form-group-wrapper'>
        <div className='form-group registerPage-content'>
            <label>Employee Role</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
            </select>
        </div>
    </div> */}
            </div>
          </div>
          <hr></hr>
          <div className="mt-2 d-flex align-items-center gap-3">
            <button
              className="btn btn-dark px-5 py-2 d-flex align-items-center gap-2"
              disabled={loading}
              onClick={handleRegister}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> wait...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
