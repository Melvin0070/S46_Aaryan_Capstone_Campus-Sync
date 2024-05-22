import React from "react";
import "./sidebar.css";
import home from "../assets/home.png";
import result from "../assets/results.png";
import fee from "../assets/fee.png";
import drops from "../assets/drops.png";
import help from "../assets/helpdesk.png";
import logout from "../assets/logout.jpg";

function Sidebar() {
  return (
    <div id="sidebar">
      <div id="sidebar-buttons-div">
        <div className="sidebar-buttons">
          <div className="sidebar-img-p">
            <img src={home} alt="home" />
            <p>Dashboard</p>
          </div>
        </div>
        <div className="sidebar-buttons">
          <div className="sidebar-img-p">
            <img src={result} alt="result" />
            <p>Results</p>
          </div>
        </div>
        <div className="sidebar-buttons">
          <div className="sidebar-img-p">
            <img src={fee} alt="fee" />
            <p>Fee Breakdown</p>
          </div>
        </div>
        <div className="sidebar-buttons">
        <div className="sidebar-img-p">
            <img src={drops} alt="drops" />
            <p>Drops</p>
          </div>
        </div>
        <div className="sidebar-buttons">
          <div className="sidebar-img-p">
            <img src={help} alt="help" />
            <p>Helpdesk</p>
          </div>
        </div>
      </div>
      <div>
        <div className="sidebar-buttons" id="logout-div">
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
