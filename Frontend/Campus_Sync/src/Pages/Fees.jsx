import React from 'react'
import './Fees.css'
import Navbar from '../Components/navbar';
import Sidebar from '../Components/sidebar';
import Hamburger from '../Components/hamburger';
import useSidebar from '../Components/toggleSidebar';
import Fee from '../Components/fee';

function Fees() {
    const { isSidebarVisible, toggleSidebar } = useSidebar();
 
    return (
      <>
        <Navbar />
        <div id="sidebar-divs-container">
          {isSidebarVisible && <Sidebar/>}
          <div id="hamburger-result-container">
            <Hamburger name="Fee Payment" toggleSidebar={toggleSidebar} />
            <Fee/>
          </div>
        </div>
      </>
    );
}

export default Fees