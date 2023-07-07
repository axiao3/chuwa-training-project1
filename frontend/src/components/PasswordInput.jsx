import React, { useState } from "react";

export default function Password(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  return (
    <div>
      <label htmlFor="password">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        onChange={(e) => props.handlePassword(e)}
      />
      <button onClick={handleTogglePassword}>
        {showPassword ? "Hide" : "Show"}
      </button>
      <p style={{color:"red"}}>{props.warning}</p>
    </div>
  );
}
