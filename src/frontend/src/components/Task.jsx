import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "./../styles/Task.css";

const Task = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = (e) => {
    if (e.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  return (
    <div
      className={`flex relative gap-1 items-center p-2  rounded-lg  cursor-pointer  ${
        isChecked
          ? "text-gray-400 bg-gray-200"
          : "hover:bg-neutral-50 hover:drop-shadow-md"
      }`}
    >
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
        <h2>The Title Goes Here</h2>

        <div className="flex gap-2 text-sm">
          <span>list</span>
          <span>dateandtime</span>
        </div>
      </div>
    </div>
  );
};

export default Task;
