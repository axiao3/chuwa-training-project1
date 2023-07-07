import React from "react";

export default function Email(props) {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" onChange={(e) => props.handleEmail(e)} />
      <p style={{color:"red"}}>{props.warning}</p>
    </div>
  );
}
