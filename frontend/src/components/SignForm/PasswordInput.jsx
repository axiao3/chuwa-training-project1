/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function Password(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  return (
    <div className="password-input">
      <label htmlFor="password">{props.title}</label>
      <div>
        <input
          type={showPassword ? "text" : "password"}
          id={props.id}
          onChange={(e) => props.handlePassword(e)}
        />
        <button type="button" onClick={handleTogglePassword}>
          <FontAwesomeIcon icon={faEye} />
        </button>
      </div>
      <p style={{ color: "#FC5A44" }}>{props.warning}</p>
    </div>
  );
}
