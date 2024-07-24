import React from "react";
import TodayIcon from "@mui/icons-material/Today";
import AddIcon from "@mui/icons-material/Add";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import ListIcon from "@mui/icons-material/List";
import axios from "axios";
import { useTasksData } from "../context/TasksProvider";

const SideBoxCategory = ({ selectedTab, setSelectedTab }) => {
  const { data, setData, setIsLoading } = useTasksData();

  const fetchAllTasks = async (val) => {
    try {
      const response = await axios.get(`/api/tasks?type=${val}`);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleSelection = async (val) => {
    const result = await fetchAllTasks(val);
    setData(result);
    setSelectedTab(val);
  };
  return (
    <div>
      <div
        className={`flex gap-2 items-center p-2 cursor-pointer ${
          selectedTab == "today"
            ? "bg-blue-600 text-white"
            : "hover:bg-neutral-300  transition-all duration-150"
        }`}
        onClick={() => handleSelection("today")}
      >
        <span>
          <TodayIcon sx={{ width: "24px", height: "24px" }} />
        </span>

        <span>Today</span>
      </div>
      <div
        className={`flex gap-2 items-center p-2 cursor-pointer ${
          selectedTab == "upcoming"
            ? "bg-blue-600 text-white"
            : "hover:bg-neutral-300 transition-all duration-150"
        }`}
        onClick={() => handleSelection("upcoming")}
      >
        <span>
          <UpcomingIcon sx={{ width: "24px", height: "24px" }} />
        </span>

        <span>Upcoming</span>
      </div>
      <div
        className={`flex gap-2 items-center p-2 cursor-pointer ${
          selectedTab == "all"
            ? "bg-blue-600 text-white"
            : "hover:bg-neutral-300 transition-all duration-150"
        }`}
        onClick={() => handleSelection("all")}
      >
        <span>
          <ListIcon sx={{ width: "24px", height: "24px" }} />
        </span>

        <span>All</span>
      </div>
    </div>
  );
};

export default SideBoxCategory;
