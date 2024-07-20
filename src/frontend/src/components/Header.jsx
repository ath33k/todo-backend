import React from "react";
import { useAuthUser } from "../context/AuthProvider";

const Header = () => {
  const { loggedUser, isAuthenticated, isLoading } = useAuthUser();
  return (
    <div className="flex justify-between p-2 bg-black text-white">
      <div className="flex gap-2">
        <div>Logo</div>
        <h2>Todo</h2>
      </div>
      {isAuthenticated && <div>{loggedUser.firstName}</div>}
    </div>
  );
};

export default Header;
