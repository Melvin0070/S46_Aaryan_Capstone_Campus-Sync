import React from 'react';
import "./Alumni-Icon.css"
import Navbar from '../Components/navbar';
import Sidebar from '../Components/sidebar';
import Hamburger from '../Components/hamburger';
import useSidebar from '../Components/toggleSidebar';
import Alumni from '../Components/alumni';


function AlumniIcons() {
    const { isSidebarVisible, toggleSidebar } = useSidebar();
 
    return (
      <>
        <Navbar />
        <div id="sidebar-divs-container">
          {isSidebarVisible && <Sidebar/>}
          <div id="hamburger-result-container">
            <Hamburger name="Alumni Icons" toggleSidebar={toggleSidebar} />
            <Alumni/>
          </div>
        </div>
      </>
    );
}

export default AlumniIcons;