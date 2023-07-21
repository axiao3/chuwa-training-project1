/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from "react";
import "./style.css";
import SignForm from "../components/SignForm/SignForm";
import waiting from "../utils/waiting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function UpdatePasswordPage() {
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
      <p className="title">Update your password</p>
      <button className="close">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <p>Enter your email link, we will send you the recovery link</p>
      <SignForm type="Update Password" />
    </div>
  );
}
