// Navbar.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    // Display the confirmation dialog
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    // Clear user session data (e.g., remove JWT token from local storage)
    localStorage.removeItem("accessToken");

    // Close the confirmation dialog
    setShowConfirmation(false);

    // Navigate to the login page ("/log_in" route)
    navigate("/log_in");
  };

  const cancelLogout = () => {
    // Hide the confirmation dialog
    setShowConfirmation(false);
  };

  if (
    location.pathname === "/" ||
    location.pathname === "/registration" ||
    location.pathname === "/log_in"
  ) {
    return null;
  }

  return (
    <div className="navbar">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
        style={{ marginTop: "20px", marginLeft: "85px" }}
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/dashboard">
            TaskMaster
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  <i className="fas fa-tachometer-alt fa-sm"></i>&nbsp;
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  <i className="far fa-address-card fa-sm"></i>&nbsp; Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink onClick={handleLogout} className="nav-link">
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
