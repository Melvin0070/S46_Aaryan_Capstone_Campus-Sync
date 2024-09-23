import React, { useState } from "react";
import "./sidebar.css";
import home from "../assets/home.png";
import result from "../assets/results.png";
import fee from "../assets/fee.png";
import drops from "../assets/drops.png";
import help from "../assets/helpdesk.png";
import logout from "../assets/logout.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeCookie, getCookie } from "../Components/cookies.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Sidebar() {
  const location = useLocation(); // Get the current location
  const [activePath, setActivePath] = useState(location.pathname); // Initialize with current path

  const handleButtonClick = (path) => {
    setActivePath(path); // Update the active path on button click
  };

  const getButtonClass = (path) => {
    return path === activePath ? "sidebar-buttons active" : "sidebar-buttons";
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("username");    
    removeCookie("email");      
    removeCookie("accessToken"); 
    toast.success("Logged out successfully"); 
    navigate("/"); 
  };

  return (
    <div id="sidebar">
      <div id="sidebar-buttons-div">
        <div>
          <Link to="/home" className="link-tag">
            <div
              className={getButtonClass("/home")}
              onClick={() => handleButtonClick("/home")}
            >
              <div className="sidebar-img-p">
                <img src={home} alt="home" />
                <p>Dashboard</p>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link to="/results" className="link-tag">
            <div
              className={getButtonClass("/results")}
              onClick={() => handleButtonClick("/results")}
            >
              <div className="sidebar-img-p">
                <img src={result} alt="result" />
                <p>Results</p>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link to="/fees" className="link-tag">
            <div
              className={getButtonClass("/fees")}
              onClick={() => handleButtonClick("/fees")}
            >
              <div className="sidebar-img-p">
                <img src={fee} alt="fee" />
                <p>Fee Payment</p>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link to="/drops" className="link-tag">
            <div
              className={getButtonClass("/drops")}
              onClick={() => handleButtonClick("/drops")}
            >
              <div className="sidebar-img-p">
                <img src={drops} alt="drops" />
                <p>Drops</p>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link to="/helpdesk" className="link-tag">
            <div
              className={getButtonClass("/helpdesk")}
              onClick={() => handleButtonClick("/helpdesk")}
            >
              <div className="sidebar-img-p">
                <img src={help} alt="help" />
                <p>Helpdesk</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <div className="sidebar-buttons" id="logout-div" onClick={handleLogout}>
          <div className="sidebar-img-p">
            <img id="logout-img" src={logout} alt="logout" />
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
