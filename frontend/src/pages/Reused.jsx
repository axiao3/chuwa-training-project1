/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from "react";
import "./style.css";
import SignForm from "../components/SignForm/SignForm";
import waiting from "../utils/waiting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Reused(props) {
  //note: props.type="Sign In" || "Sign Up" || "Forget Password";
  const hyperlink = {
    cursor: "pointer",
    color: "blue",
    textDecoration: "underline",
  };

  const handleType = (e) => {
    waiting(100).then(
      () =>
        (window.location.href = `/${e.target.textContent
          .split(" ")
          .join("-")
          .toLowerCase()}`)
    );
  };

  return (
    <div className="user-action-container">
      <p className="title">
        {props.type === "Sign In"
          ? "Sign in to your account"
          : props.type === "Sign Up"
          ? "Sign up an account"
          : "Update your password"}
      </p>
      <button className="close">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      {props.type === "Forget Password" ? (
        <p>Enter your email link, we will send you the recovery link</p>
      ) : null}
      <SignForm type={props.type} />
      {props.type === "Sign In" ? (
        <div className="bottom">
          <div>
            <p>Don't have an account?</p>
            <p style={hyperlink} onClick={(e) => handleType(e)}>
              Sign Up
            </p>
          </div>
          <p style={hyperlink} onClick={(e) => handleType(e)}>
            Forget Password
          </p>
        </div>
      ) : props.type === "Sign Up" ? (
        <div className="bottom">
          <div>
            <p>Already have an account?</p>
            <p style={hyperlink} onClick={(e) => handleType(e)}>
              Sign In
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
