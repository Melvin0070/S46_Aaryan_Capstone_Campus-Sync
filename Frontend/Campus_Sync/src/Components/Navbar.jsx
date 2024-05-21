import React from "react";
import logo from "../assets/logo.png";
import "./navbar.css";

function Navbar() {
  return (
    <div id="navbar">
      <div id="left-navbar-div">
        <div>
          <img id="logo-img" src={logo} alt="logo" />
        </div>
        <div>
          <div id="dashboard-box">
            <p>Dashboard</p>
          </div>
        </div>
      </div>
      <div id="navbar-account">
        <p>A</p>
      </div>
    </div>
  );
}

export default Navbar;
