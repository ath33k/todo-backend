import React, { useEffect, useRef, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Box, Modal, Typography } from "@mui/material";

const SideBoxList = () => {
  const [isOverflow, setIsOverflow] = useState(false);
  const sideElement = useRef();
  const [modelOpen, setModelOpen] = useState(false);

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
      {modelOpen && <CreateList open={modelOpen} setOpen={setModelOpen} />}
      <div className="p-2 font-semibold border-2">Lists</div>
      <div className="h-full overflow-y-scroll " ref={sideElement}>
        <div>Lorem ipsum dolor sit amet.</div>
        <div>Lorem ipsum dolor sit amet.</div>
        <div>Lorem ipsum dolor sit amet.</div>

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

function CreateList({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
}
