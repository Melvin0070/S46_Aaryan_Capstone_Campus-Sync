import React from "react";
import logo from "../assets/logo.png";
import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar({ showDashboard }) {
  return (
    <div id="navbar">
      <div id="left-navbar-div">
        <Link to="/">
          <div>
            <img id="logo-img" src={logo} alt="website-logo" />
          </div>
        </Link>
        <div>
          {showDashboard && (
            <div id="dashboard-box">
              <p>Dashboard</p>
            </div>
          )}
        </div>
      </div>
      <div id="navbar-account">
        <p>A</p>
      </div>
    </div>
  );
}

export default Navbar;
