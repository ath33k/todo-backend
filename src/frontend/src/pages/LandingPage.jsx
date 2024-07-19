import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  // const handleSignin = async () => {
  //   try {
  //     await axios.get("/api/auth");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <div>Please Sign in</div>
      <Link to={"/login"}>Login with google</Link>
    </div>
  );
};

export default LandingPage;
