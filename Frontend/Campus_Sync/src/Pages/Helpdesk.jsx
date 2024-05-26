import React from 'react'
import './Helpdesk.css'
import Navbar from '../Components/navbar';
import Sidebar from '../Components/sidebar';
import Hamburger from '../Components/hamburger';
import useSidebar from '../Components/toggleSidebar';
import Report from '../Components/report';

function Helpdesk() {
    const { isSidebarVisible, toggleSidebar } = useSidebar();
 
    return (
      <>
        <Navbar />
        <div id="sidebar-divs-container">
          {isSidebarVisible && <Sidebar/>}
          <div id="hamburger-result-container">
            <Hamburger name="Helpdesk" toggleSidebar={toggleSidebar} />
            <Report/>
          </div>
        </div>
      </>
    );
}

export default Helpdesk;