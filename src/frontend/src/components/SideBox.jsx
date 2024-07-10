import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";

import SideBoxCategory from "./SideBoxCategory";
import SideBoxList from "./SideBoxList";

const SideBox = ({ selectedTab, setSelectedTab }) => {
  useEffect(() => {
    if (!selectedTab) {
      setSelectedTab("today");
    }
  }, [selectedTab, setSelectedTab]);
  return (
    <div className="flex flex-col h-full gap-1 pt-4 bg-stone-200 overflow-hidden">
      <SideBoxCategory
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Divider />
      <SideBoxList selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  );
};

export default SideBox;
