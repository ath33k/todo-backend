import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const CreateList = ({ open, setOpen, setLists }) => {
  const [name, setName] = useState("");
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/lists", {
        name,
      });
      const result = response.data;
      console.log(result);
      setLists((curr) => [...curr, result]);
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
          <div className="flex flex-col justify-center gap-2">
            <h2 className="">Create a list</h2>
            <TextField
              value={name}
              label={"Name"}
              size="small"
              onChange={(e) => setName(e.target.value)}
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

export default CreateList;
