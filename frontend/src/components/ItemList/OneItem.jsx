import React, { useState, useEffect } from "react";
import "./style.css";
import EditButton from "./EditButton";
import AddButton from "./AddButton";

export default function OneItem(props) {
  const user = { type: "admin" }; //test

  return (
    <div className="item">
      <img src={props.item.link}></img>
      <p className="item-name"> {props.item.name} </p>
      <p className="item-price">${props.item.price}</p>
      <div className="buttons-container">
        <AddButton quantity={props.item.cartQuantity} itemId={props.item._id} />
        {user.type === "admin" ? <EditButton itemId={props.item._id} /> : null}
      </div>
    </div>
  );
}
