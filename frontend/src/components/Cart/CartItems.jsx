/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./style.css";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OneItem from "../Cart/OneItem";

export default function CartItems() {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="cart-container">
      {cart
        ? Object.entries(cart).map(([id, item]) => (
            <OneItem key={id} itemId={id} item={item} />
          ))
        : null}
    </div>
  );
}
