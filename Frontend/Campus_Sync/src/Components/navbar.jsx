import React from "react";
import logo from "../assets/logo.png";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getCookie } from "./cookies";
import {jwtDecode} from "jwt-decode";

// Function to generate a color from a string
const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

// Function to determine if the color is light or dark
const isLightColor = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  // Calculate the luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

// Function to extract the first letter
const getFirstLetter = (name) => {
  return name.charAt(0).toUpperCase();
};

function Navbar({ showDashboard }) {
  const [account, setShowAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");
  const accountRef = useRef(null);

  useEffect(() => {
    // Fetch user details from cookies or an API
    const token = getCookie("accessToken");
    const decodedToken = jwtDecode(token);

    setUsername(getCookie("username"));
    setEmail(getCookie("email"));
    setID(decodedToken.ID);
  }, []);

  // Handle popup closure on click
  const toggleAccount = () => {
    setShowAccount(!account);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.getElementById("navbar-account");
      if (
        navbar &&
        !navbar.contains(event.target) &&
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setShowAccount(false);
      }
    };

    // Handle popup closure on mousedown
    const handleScroll = () => {
      setShowAccount(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [account]);

  const firstLetter = getFirstLetter(username);
  const backgroundColor = stringToColor(username);
  const textColor = isLightColor(backgroundColor) ? "#000000" : "#EEEEEE";

  return (
    <div id="navbar">
      <div id="left-navbar-div">
        <Link to="/home">
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
      <div
        id="navbar-account"
        onClick={toggleAccount}
        style={{ backgroundColor, color: textColor, border: `1px solid ${textColor}` }}
      >
        <p>{firstLetter}</p>
      </div>

      {account && (
        <div id="account-div-navbar" ref={accountRef}>
          <div className="profile-popup">
            <div className="profile-info">
              <div className="profile-details">
                <p className="username">{username}</p>
                <p className="email">{email}</p>
                <p className="user-id">ID: {ID}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
