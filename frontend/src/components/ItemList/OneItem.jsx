/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./style.css";
import EditButton from "./EditButton";
import AddButton from "./AddButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function OneItem(props) {
  const {user} = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/items/${props.item._id}`);
  };

  return (
    <div className="item" style={{ flex: 1 }}>
      <img src={props.item.link} onClick={handleClick}></img>
      <p className="item-name"> {props.item.name} </p>
      <p className="item-price">${props.item.price}</p>
      <div className="buttons-container">
        <AddButton itemId={props.item._id} />
        {user.type === "admin" ? <EditButton itemId={props.item._id} /> : null}
      </div>
    </div>
  );
}
