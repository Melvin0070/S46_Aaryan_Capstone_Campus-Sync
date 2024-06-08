import React from 'react';
import './Community.css';
import Navbar from '../Components/navbar';
import Sidebar from '../Components/sidebar';
import Hamburger from '../Components/hamburger';
import useSidebar from '../Components/toggleSidebar';
import Comments from '../Components/comments';


function Community() {
    const { isSidebarVisible, toggleSidebar } = useSidebar();
 
    return (
      <>
        <Navbar />
        <div id="sidebar-divs-container">
          {isSidebarVisible && <Sidebar/>}
          <div id="hamburger-result-container">
            <Hamburger name="Community Corner" toggleSidebar={toggleSidebar} />
            <Comments/>
          </div>
        </div>
      </>
    );
}

export default Community;