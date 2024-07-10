import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import AddIcon from "@mui/icons-material/Add";
import { useTasksData } from "../context/TasksProvider";
import CreateTask from "./CreateTask";

const avoidedTabs = ["today", "upcoming", "all"];

const MainBox = ({ selectedTab, setSelectedTab }) => {
  const { data, setData, listId } = useTasksData();
  const [taskOpen, setTaskOpen] = useState(false);

  return (
    <div className="flex flex-col h-full gap-2 ">
      {taskOpen && (
        <CreateTask
          open={taskOpen}
          setOpen={setTaskOpen}
          listId={listId}
          setData={setData}
        />
      )}
      <div className="flex justify-between items-end px-6 md:px-8 p-2 md:pt-4 ">
        <div>
          <h1 className="capitalize">{selectedTab}</h1>
          <span className="text-sm">July 2024</span>
        </div>
        {!avoidedTabs.includes(selectedTab) && (
          <div>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setTaskOpen(true)}
            >
              New Task
            </Button>
          </div>
        )}
      </div>
      <Divider />

      <div className="flex flex-col px-2 md:px-4 h-full overflow-y-scroll gap-1">
        {data ? (
          data.map((el) => <Task key={el.id} task={el} setData={setData} />)
        ) : (
          <div>Null</div>
        )}
      </div>
    </div>
  );
};

export default MainBox;
