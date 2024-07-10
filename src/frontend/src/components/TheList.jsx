import React from "react";
import { useTasksData } from "../context/TasksProvider";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import { IconButton } from "@mui/material";

const TheList = ({ list, selectedTab, setSelectedTab }) => {
  const { data, setData, listId, setListId } = useTasksData();
  console.log(data);

  const handleListClick = async () => {
    try {
      const response = await axios.get(`/api/lists/${list.id}`);
      const result = response.data;
      setData(result.tasks);
    } catch (err) {
      console.log(err);
    }
    setSelectedTab(list.name);
    setListId(list.id);
  };

  const handleDeletion = async () => {
    try {
      await axios.delete(`/api/lists/${list.id}`);
      location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={`p-2 px-4 capitalize flex items-center justify-between cursor-pointer ${
        selectedTab == list.name
          ? "bg-blue-600 text-white"
          : "hover:bg-neutral-300"
      } `}
      onClick={handleListClick}
    >
      <h2>{list.name}</h2>
      <IconButton
        size="small"
        sx={{
          "&:hover": {
            color: "red",
          },
          color: "black",
        }}
        onClick={handleDeletion}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default TheList;
