import React from "react";

export default function Email(props) {
  return (
    <div className="email-input">
      <label htmlFor="email">Email</label>
      <input type="text" id="email" onChange={(e) => props.handleEmail(e)} />
      <p style={{color:"#FC5A44"}}>{props.warning}</p>
    </div>
  );
}
