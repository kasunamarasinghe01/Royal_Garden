import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import {MdDashboard, MdPerson, MdOutlineLogout, MdSupervisedUserCircle} from 'react-icons/md';

function Navbar() {
  const User = JSON.parse(localStorage.getItem('CurentUser'));

  const {auth, dispatch} = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({type: 'LOGOUT_SUCCESS'});
    navigate('/home');
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{padding: '10px 50px'}}>
        <Link className="navbar-brand" to="/">
          <b>Royal Garden</b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/room">
                Room
              </Link>
            </li>

            {/* {User ? (
              <>
                <h1 style={{color: 'white'}}>{User.username}</h1>
              </>
            ) : (
              <> */}
                {!auth.isAuthenticated && !auth.user && !auth.token && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>

                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Login
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <Link className="dropdown-item" to="/login/user">
                          User
                        </Link>
                        <Link className="dropdown-item" to="/login/employee">
                          Employee
                        </Link>
                        <Link className="dropdown-item" to="/login/admin">
                          Admin
                        </Link>
                      </div>
                </div>

                  </>
                )}

                {auth.isAuthenticated && auth.token && auth.user && (
                  <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      > 
                        {auth.user?.username}
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                        style={{left: '-150%'}}
                      >
                      {auth.user?.role.includes('Employee') && (
                          <>
                            {/* Employee and Admin SPECIFIC LINKS */}
                            <Link className="dropdown-item d-flex align-items-center gap-2" to="/dashbord">
                              <MdDashboard /> Dashboard
                            </Link>
                            
                          </>
                        )}
                      
                        {auth.user?.role.includes('Admin') && (
                          <>
                            {/* ADMIN SPECIFIC LINKS */}
                            
                            <Link className="dropdown-item d-flex align-items-center gap-2" to="/empmanscreen">
                              <MdSupervisedUserCircle /> Employee Management
                            </Link>
                          </>
                        )}
                        <Link className="dropdown-item d-flex align-items-center gap-2" to="/profile">
                          <MdPerson /> Profile
                        </Link>
                        <button className="dropdown-item d-flex align-items-center gap-2" onClick={handleLogout}><MdOutlineLogout />Logout</button>
                      </div>
                </div>
                )}
                

                
              {/* </>
            )} */}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
