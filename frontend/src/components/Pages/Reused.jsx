import React from "react";
import { useNavigate } from "react-router-dom";
import SignForm from "../SignForm/SignForm";
import waiting from "../Helpers/waiting";

export default function Reused(props) {
  //note: props.type="Sign In" || "Sign Up" || "Forget Password";
  const navigate = useNavigate();
  const hyperlink = {
    cursor: "pointer",
    color: "blue",
    textDecoration: "underline",
  };

  const handleType = (e) => {
    waiting(100).then(() =>
      navigate(`/${e.target.textContent.split(" ").join("-").toLowerCase()}`)
    );
  };

  return (
    <div>
      <h1>
        {props.type === "Sign In"
          ? "Sign in to your account"
          : props.type === "Sign Up"
          ? "Sign up an account"
          : "Update your password"}
      </h1>
      {props.type === "Forget Password" ? (
        <p>Enter your email link, we will send you the recovery link</p>
      ) : null}
      <SignForm type={props.type} />
      {props.type === "Sign In" ? (
        <div>
          <p>Don't have an account?</p>
          <p style={hyperlink} onClick={(e) => handleType(e)}>
            Sign Up
          </p>
          <p style={hyperlink} onClick={(e) => handleType(e)}>
            Forget Password
          </p>
        </div>
      ) : props.type === "Sign Up" ? (
        <div>
          <p>Already have an account?</p>
          <p style={hyperlink} onClick={(e) => handleType(e)}>
            Sign In
          </p>
        </div>
      ) : null}
    </div>
  );
}
