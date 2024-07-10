import { Button, Divider } from "@mui/material";
import React from "react";
import Task from "./Task";
import AddIcon from "@mui/icons-material/Add";

const MainBox = () => {
  return (
    <div className="flex flex-col h-full gap-2 ">
      <div className="flex justify-between items-end px-6 md:px-8 p-2 md:pt-4 ">
        <div>
          <h1>Heading</h1>
          <span className="text-sm">July 2024</span>
        </div>
        <div>
          <Button variant="contained" size="small" startIcon={<AddIcon />}>
            New Task
          </Button>
        </div>
      </div>
      <Divider />

      <div className="flex flex-col px-2 md:px-4 h-full overflow-y-scroll gap-1">
        <Task />
        <Task />
      </div>
    </div>
  );
};

export default MainBox;
