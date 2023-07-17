import React, { useState, useEffect } from "react";
import "./style.css";
import EditButton from "./EditButton";
import AddButton from "./AddButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function CartItmes(props) {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <li className="item">
      <img src={cart.link} onClick={handleClick}></img>
      <p className="item-name"> {cart.name} </p>
      <p className="item-price">${cart.price}</p>
      <div className="buttons-container">
        <AddButton itemId={props.item._id} />
        {user.type === "admin" ? <EditButton itemId={props.item._id} /> : null}
      </div>
    </li>
  );
}