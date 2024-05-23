import React from "react";
import Navbar from "../Components/navbar";
import Sidebar from "../Components/sidebar";
import Spotlight from "../Components/spotlight";
import "./Home.css"
import Announcements from "../Components/announcements";

function Home() {

  return (
    <>
      <Navbar showDashboard={true} />

      <div id="home-main-div">
        <Sidebar />
        <div>
        <Spotlight />
        <Announcements/>
        </div>
      </div>
    </>
  );
}

export default Home;
