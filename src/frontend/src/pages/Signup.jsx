import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, redirect } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lasttName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const passwordRef = useRef();

  const handleSubmission = async (e) => {
    e.preventDefault();
    location.assign("/");
    if (password != passwordConfirm) {
      passwordRef.current.focus();
      return;
    }
    try {
      const user = await axios.post("/api/auth/register", {
        firstName,
        lasttName,
        email,
        password: passwordConfirm,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center bg-white h-svh p-4">
      <div className="flex flex-col w-full md:w-[50%]">
        <div className="pb-4">
          <h1>Create an account</h1>
          <p>
            Already have an account?&nbsp;
            <Link to={"/signin"}>Sign In</Link>
          </p>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmission}>
          <TextField
            label="Email"
            type="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="First Name"
            type="text"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            type="text"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            required
            error={passwordConfirm != password}
            disabled={!password}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            inputRef={passwordRef}
            helperText={
              passwordConfirm != password ? "Password Doesn't Match" : ""
            }
          />
          <div className="">
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "1rem" }}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
      {/* <Link to={"/login"}>Login with google</Link> */}
    </div>
  );
};

export default Signup;
