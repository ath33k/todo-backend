import { Button, Divider, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TodayIcon from "@mui/icons-material/Today";
import AddIcon from "@mui/icons-material/Add";

const SideBox = () => {
  const [isOverflow, setIsOverflow] = useState(false);
  const sideElement = useRef();

  useEffect(() => {
    const checkOverflow = () => {
      if (sideElement.current.scrollHeight > sideElement.current.clientHeight) {
        setIsOverflow(true);
      } else {
        setIsOverflow(false);
      }
    };
    checkOverflow();
  }, []);
  return (
    <div className="flex flex-col h-full gap-2 pt-4 bg-stone-200">
      <div className="h-full overflow-y-scroll" ref={sideElement}>
        <div className="flex gap-2 items-center hover:bg-neutral-300 p-2 cursor-pointer">
          <span>
            <TodayIcon sx={{ width: "24px", height: "24px" }} />
          </span>

          <span>Today</span>
        </div>
        <div className="flex gap-2 items-center hover:bg-neutral-300 p-2 cursor-pointer">
          <span>
            <TodayIcon sx={{ width: "24px", height: "24px" }} />
          </span>

          <span>Upcoming</span>
        </div>
        <div className="flex gap-2 items-center hover:bg-neutral-300 p-2 cursor-pointer">
          <span>
            <TodayIcon sx={{ width: "24px", height: "24px" }} />
          </span>

          <span>All</span>
        </div>

        <Divider />

        <div className="p-2 font-semibold border-2">Lists</div>
        <div
          className={`flex items-center gap-2 px-2 p-1  hover:bg-neutral-300 text-blue-600 cursor-pointer ${
            isOverflow ? "hidden" : ""
          }`}
        >
          <span>
            <AddIcon />
          </span>
          <span>New List</span>
        </div>
      </div>
      <div
        className={`flex items-center gap-2 p-2 hover:bg-neutral-300 text-blue-600 cursor-pointer ${
          isOverflow ? "" : "hidden"
        }`}
      >
        <span>
          <AddIcon />
        </span>
        <span>New List</span>
      </div>
    </div>
  );
};

export default SideBox;
