import React from 'react';
import './announcements.css';
import rightArrow from '../assets/right-arrow-short.png';

function Announcements() {
  return (
    <div>
        <div id="announcements-heading">Announcements</div>
        <div id='announce-divs'>
            <div className="announcement-div">
                <p>Career Development Workshop Series</p>
                <img src={rightArrow} alt="right-arrow" />
            </div>
            <div className="announcement-div"></div>
            <div className="announcement-div"></div>
        </div>
    </div>
  )
}

export default Announcements;