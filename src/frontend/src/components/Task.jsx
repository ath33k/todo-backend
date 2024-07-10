import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteIcon from "@mui/icons-material/Delete";
import "./../styles/Task.css";
import axios from "axios";
import { list } from "postcss";

const Task = ({ task, setData }) => {
  const [isChecked, setIsChecked] = useState(function () {
    return task.isCompleted;
  });
  const [deletedDialog, setDeleteDialog] = useState(false);

  const handleChecked = async (e) => {
    if (isChecked) {
      try {
        const response = await axios.put(`/api/tasks/${task.id}`, {
          isCompleted: false,
        });
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
      setIsChecked(false);
    } else {
      try {
        const response = await axios.put(`/api/tasks/${task.id}`, {
          isCompleted: true,
        });
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
      setIsChecked(true);
    }
  };

  const handleDeletion = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      setDeleteDialog(false);
      setData((prev) => {
        const filtered = prev
          .map((el) => el)
          .filter((el) => el.name != task.name);
        return filtered;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`flex relative gap-1 items-center p-2  rounded-lg cursor-pointer justify-between ${
        isChecked
          ? "text-gray-400 bg-gray-200"
          : "hover:bg-neutral-50 hover:drop-shadow-md"
      }`}
    >
      {deletedDialog && (
        <DeleteDialog
          open={deletedDialog}
          setOpen={setDeleteDialog}
          handleDeletion={handleDeletion}
        />
      )}
      <div className="flex items-center">
        <div>
          <Checkbox
            checked={isChecked}
            icon={<RadioButtonUncheckedIcon />}
            size="medium"
            checkedIcon={<CheckCircleIcon />}
            onChange={handleChecked}
          />
        </div>
        <div className="flex flex-col">
          <h2>{task.name}</h2>

          <div className="flex gap-2 text-xs">
            <span>list</span>
            <span>{task.dateTime}</span>
          </div>
        </div>
      </div>
      <div className="flex">
        <IconButton sx={{ color: "red" }} onClick={() => setDeleteDialog(true)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Task;

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
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure You want to delete this task ?
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
