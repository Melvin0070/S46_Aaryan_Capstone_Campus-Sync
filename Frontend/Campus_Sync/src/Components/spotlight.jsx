import React from "react";
import "./spotlight.css";
import topScore from "../assets/top-scorer.png";
import communityCorner from "../assets/community-corner.png";
import alumniIcon from "../assets/alumni-icon.png";
import { Link } from "react-router-dom";

function Spotlight() {
  return (
    <div>
      <div id="spot-heading">Spotlight</div>
      <div id="spot-divs">
        <Link to="/ranks" className="link-tag">
          <div className="spotlight-div">
            <div className="spotlight-head">Top Scorers</div>
            <div className="spotlight-img">
              <img src={topScore} alt="topscorer" />
            </div>
          </div>
        </Link>
        <Link to="/alumni" className="link-tag">
          <div className="spotlight-div">
            <div className="spotlight-head">Alumni Icons</div>
            <div className="spotlight-img">
              <img src={alumniIcon} alt="alumniicon" />
            </div>
          </div>
        </Link>
        <Link to="/community" className="link-tag">
          <div className="spotlight-div">
            <div className="spotlight-head">Comments Corner</div>
            <div className="spotlight-img">
              <img src={communityCorner} alt="commentscorner" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Spotlight;
