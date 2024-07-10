import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const CreateTask = ({ open, setOpen, listId, setData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState(
    new Date(Date.now()).toISOString().slice(0, 16)
  );
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/tasks/${listId}`, {
        name,
        description,
        dateTime,
      });
      const result = response.data;
      console.log(result);
      setData((curr) => [...curr, result]);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center gap-3">
            <h2 className="">Create a Task</h2>
            <TextField
              value={name}
              label={"Name"}
              size="small"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              value={description}
              label={"Description"}
              size="small"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />

            <div className="pt-2 flex justify-end gap-2">
              <Button type="submit" size="small" variant="contained">
                Submit
              </Button>
              <Button size="small" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateTask;
