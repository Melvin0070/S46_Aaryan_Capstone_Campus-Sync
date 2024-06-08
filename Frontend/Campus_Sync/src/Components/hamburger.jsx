import React from "react";
import hamburger from "../assets/hamburger.png";
import "./hamburger.css";

function Hamburger({ name, toggleSidebar  }) {
  return (
    <div id="demo">
      <div id="hamburger-container">
        <div id="hamburger-div" onClick={toggleSidebar}>
          <img src={hamburger} alt="menu" />
        </div>
        <div id="hamburger-selection-name">{name}</div>
      </div>
      <hr className="custom-line" />
    </div>
  );
}

export default Hamburger;
