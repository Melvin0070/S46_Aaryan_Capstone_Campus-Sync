import React from 'react';
import './TopScore.css';
import Navbar from '../Components/navbar';
import Sidebar from '../Components/sidebar';
import Hamburger from '../Components/hamburger';
import useSidebar from '../Components/toggleSidebar';
import Rank from '../Components/rank';


function TopScore() {
    const { isSidebarVisible, toggleSidebar } = useSidebar();
 
    return (
      <>
        <Navbar />
        <div id="sidebar-divs-container">
          {isSidebarVisible && <Sidebar/>}
          <div id="hamburger-result-container">
            <Hamburger name="Top Scorers" toggleSidebar={toggleSidebar} />
            <Rank/>
          </div>
        </div>
      </>
    );
}

export default TopScore;