import React from 'react';
import './Drops.css';
import Navbar from '../Components/navbar';
import Sidebar from '../Components/sidebar';
import Hamburger from '../Components/hamburger';
import useSidebar from '../Components/toggleSidebar';
import Drop from '../Components/drop';

function Fees() {
    const { isSidebarVisible, toggleSidebar } = useSidebar();
 
    return (
      <>
        <Navbar />
        <div id="sidebar-divs-container">
          {isSidebarVisible && <Sidebar/>}
          <div id="hamburger-result-container">
            <Hamburger name="Drops" toggleSidebar={toggleSidebar} />
            <Drop/>
          </div>
        </div>
      </>
    );
}

export default Fees;