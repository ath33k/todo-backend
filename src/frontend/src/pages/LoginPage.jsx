import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("/api/auth/authenticate", {
        email,
        password,
      });

      setIsLoading(false);
      setTimeout(() => {
        location.assign("/");
      }, 1000);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white h-svh p-4">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="flex flex-col w-full md:w-[50%]">
        <div className="pb-4">
          <h1>Log In to you account</h1>
          <p>
            Don&apos;t have an account?&nbsp;
            <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
        <form action="" className="flex flex-col gap-2" onSubmit={handleSignin}>
          <TextField
            label="Email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            inputRef={emailRef}
          />
          <TextField
            label="Password"
            type="password"
            required
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
