import React from "react";
import "./sidebar.css";

function Sidebar() {
  return (
    <div id="sidebar">
      <div id="sidebar-buttons-div">
        <div className="sidebar-buttons">Dashboard</div>
        <div className="sidebar-buttons">Results</div>
        <div className="sidebar-buttons">Fee Breakdown</div>
        <div className="sidebar-buttons">Drops</div>
        <div className="sidebar-buttons">Helpdesk</div>
      </div>
      <div >
        <div className="sidebar-buttons" id="logout-div">Logout</div>
      </div>
    </div>
  );
}

export default Sidebar;
