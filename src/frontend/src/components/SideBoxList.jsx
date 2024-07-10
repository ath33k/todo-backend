import React, { useEffect, useRef, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import TheList from "./TheList";
import CreateList from "./CreateList";

const SideBoxList = ({ selectedTab, setSelectedTab }) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const sideElement = useRef();
  const [modelOpen, setModelOpen] = useState(false);
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get("/api/lists");
        const result = response.data;
        setLists(result);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLists();
  }, []);

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
    <div className="flex flex-col overflow-hidden justify-between h-full">
      {modelOpen && (
        <CreateList
          open={modelOpen}
          setOpen={setModelOpen}
          setLists={setLists}
        />
      )}
      <div className="p-2 font-semibold border-2">Lists</div>
      <div className="h-full overflow-y-scroll " ref={sideElement}>
        {lists ? (
          lists.map((el) => (
            <TheList
              key={el.id}
              list={el}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))
        ) : (
          <div>loading...</div>
        )}

        <div
          className={`flex items-center gap-2 px-2 p-1  hover:bg-neutral-300 text-blue-600 cursor-pointer ${
            isOverflow ? "hidden" : ""
          }`}
          onClick={() => setModelOpen(true)}
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
        onClick={() => setModelOpen(true)}
      >
        <span>
          <AddIcon />
        </span>
        <span>New List</span>
      </div>
    </div>
  );
};

export default SideBoxList;
