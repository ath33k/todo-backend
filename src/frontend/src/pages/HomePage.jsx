import React, { useState } from "react";
import Default from "../layouts/Default";
import "./../styles/HomePage.css";
import SideBox from "../components/SideBox";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "../components/SideBar";
import MainBox from "../components/MainBox";

const HomePage = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <Default>
      <div className="main-container">
        <SideBar open={sideBarOpen} setOpen={setSideBarOpen} />
        <span className="ham-menu p-2 px-4">
          <IconButton onClick={() => setSideBarOpen(true)}>
            <MenuIcon />
          </IconButton>
        </span>
        <div className="side-box">
          <SideBox />
        </div>
        <div className="main-box">
          <MainBox />
        </div>
      </div>
    </Default>
  );
};

export default HomePage;
