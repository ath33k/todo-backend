import React from "react";
import NotFound from "./../assets/pageNotFound.svg";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const PageNotFound = () => {
  return (
    <div className="flex h-svh w-full justify-center items-center">
      <div className="flex flex-col items-center">
        <img src={NotFound} className="w-[50%] lg:w-[30%]"></img>

        <h1 className="uppercase">Page not found - 404</h1>
        <p>We cannot find the page You are looking for </p>
        <Link to={"/"} className="mt-4">
          <Button variant="outlined" size="small">
            Back to homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
