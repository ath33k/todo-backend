import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [passworrd, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  // const handleSignin = async () => {
  //   try {
  //     await axios.get("/api/auth");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="flex justify-center items-center bg-white h-svh p-4">
      <div className="flex flex-col w-full md:w-[50%]">
        <div className="pb-4">
          <h1>Log In to you account</h1>
          <p>
            Don&apos;t have an account?&nbsp;
            <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
        <form action="" className="flex flex-col gap-2">
          <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="">
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "1rem" }}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
      {/* <Link to={"/login"}>Login with google</Link> */}
    </div>
  );
};

export default LandingPage;
