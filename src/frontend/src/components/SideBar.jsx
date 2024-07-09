import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SideBox from "./SideBox";

const SideBar = ({ open, setOpen, children }) => {
  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: 250, height: "100%" }}>
        <SideBox />
      </Box>
    </Drawer>
  );
};

export default SideBar;
