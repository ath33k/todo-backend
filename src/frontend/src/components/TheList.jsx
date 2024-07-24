import React, { useState } from "react";
import { useTasksData } from "../context/TasksProvider";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

const TheList = ({ list, selectedTab, setSelectedTab }) => {
  const { data, setData, listId, setListId, setIsLoading } = useTasksData();
  const [deletedDialog, setDeleteDialog] = useState(false);

  const handleListClick = async () => {
    try {
      const response = await axios.get(`/api/lists/${list.id}`);
      const result = response.data;
      setIsLoading(false);
      setData(result.tasks);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
    setSelectedTab(list.name);
    setListId(list.id);
  };

  const handleDeletion = async () => {
    try {
      await axios.delete(`/api/lists/${list.id}`);
      setDeleteDialog(false);
      location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {deletedDialog && (
        <DeleteDialog
          open={deletedDialog}
          setOpen={setDeleteDialog}
          handleDeletion={handleDeletion}
        />
      )}
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
          onClick={() => setDeleteDialog(true)}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </div>
    </>
  );
};

export default TheList;

function DeleteDialog({ open, setOpen, handleDeletion }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are You sure ?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure You want to delete this list ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleDeletion} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
