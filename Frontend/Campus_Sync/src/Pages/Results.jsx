import React, {useState} from "react";
import "./Results.css";
import Navbar from "../Components/navbar";
import Hamburger from "../Components/hamburger";
import Result from "../Components/result";
import Sidebar from "../Components/sidebar";
import useSidebar from "../Components/toggleSidebar";


function Results() {
  const { isSidebarVisible, toggleSidebar } = useSidebar();
 
  return (
    <>
      <Navbar />
      <div id="sidebar-divs-container">
        {isSidebarVisible && <Sidebar/>}
        <div id="hamburger-result-container">
          <Hamburger name="Results" toggleSidebar={toggleSidebar} />
          <Result />
        </div>
      </div>
    </>
  );
}

export default Results;
