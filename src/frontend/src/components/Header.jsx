import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between p-2 bg-black text-white">
      <div className="flex gap-2">
        <div>Logo</div>
        <h2>Todo</h2>
      </div>
      <div>Username</div>
    </div>
  );
};

export default Header;
