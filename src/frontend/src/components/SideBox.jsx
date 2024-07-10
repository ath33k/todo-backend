import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";

import SideBoxCategory from "./SideBoxCategory";
import SideBoxList from "./SideBoxList";

const SideBox = () => {
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    if (!selectedTab) {
      setSelectedTab("today");
    }
  }, [selectedTab]);
  return (
    <div className="flex flex-col h-full gap-1 pt-4 bg-stone-200 overflow-hidden">
      <SideBoxCategory
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Divider />
      <SideBoxList />
    </div>
  );
};

export default SideBox;
