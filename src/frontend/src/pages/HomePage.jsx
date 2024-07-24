import React, { useEffect, useState } from "react";
import Default from "../layouts/Default";
import "./../styles/HomePage.css";
import SideBox from "../components/SideBox";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "../components/SideBar";
import MainBox from "../components/MainBox";

const HomePage = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(function () {
    const storedValue = localStorage.getItem("selectedTab");
    return storedValue || "";
  });

  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  return (
    <Default>
      <div className="main-container">
        <SideBar
          open={sideBarOpen}
          setOpen={setSideBarOpen}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <span className="ham-menu p-2 px-4">
          <IconButton onClick={() => setSideBarOpen(true)}>
            <MenuIcon />
          </IconButton>
        </span>
        <div className="side-box">
          <SideBox selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
        <div className="main-box overflow-hidden">
          <MainBox selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
      </div>
    </Default>
  );
};

export default HomePage;
