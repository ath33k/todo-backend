import { Button, Divider, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import AddIcon from "@mui/icons-material/Add";
import { useTasksData } from "../context/TasksProvider";
import CreateTask from "./CreateTask";
import AddTaskSVG from "./../assets/addtasksvg.svg";

const avoidedTabs = ["today", "upcoming", "all"];

const MainBox = ({ selectedTab, setSelectedTab }) => {
  const { data, setData, listId, isLoading } = useTasksData();
  const [taskOpen, setTaskOpen] = useState(false);

  return (
    <div className="flex flex-col h-full gap-2">
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

      <div
        className={`flex flex-col px-2 md:px-4 h-full overflow-y-scroll gap-1`}
      >
        {isLoading ? (
          <div className="flex flex-col gap-3">
            <MainSkeletons />
          </div>
        ) : data?.length > 0 ? (
          data.map((el) => <Task key={el.id} task={el} setData={setData} />)
        ) : (
          <div className="flex items-center flex-col gap-2 h-full justify-center">
            <img src={AddTaskSVG} alt="" className="w-[50%] lg:w-[25%]" />
            <div className="text-center">
              <div className="uppercase">Tasks not Found</div>
              <div className="Capitalize">
                Please Create a Task to get started
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function MainSkeletons() {
  const skeletons = [];
  for (let i = 0; i < 7; i++) {
    skeletons.push(
      <Skeleton
        variant="rectangular"
        height={64}
        sx={{ borderRadius: "5px" }}
      />
    );
  }
  return skeletons;
}

export default MainBox;
