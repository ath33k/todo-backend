import React from "react";
import { useAuthUser } from "../context/AuthProvider";
import { Button } from "@mui/material";
import ToDoLogo from "./../assets/todoLogo.svg";
import axios from "axios";

const Header = () => {
  const { loggedUser, isAuthenticated, isLoading } = useAuthUser();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", null, { withCredentials: true });
      location.assign("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between p-2 bg-black text-white">
      <div className="flex gap-2 items-center">
        <img src={ToDoLogo} alt="" className="w-[36px] h-[36px]" />
      </div>
      {isAuthenticated && (
        <div className="flex gap-4">
          <span>{loggedUser.firstName}</span>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              borderColor: "white",
              "&:hover": {
                color: "black",
                backgroundColor: "white",
                transition: "all",
                transitionDuration: "0.3s",
              },
            }}
            variant="outlined"
            size="small"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
