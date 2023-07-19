/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import CartSummary from "./CartSummary";
import Coupon from "./Coupon";
import CartItems from "./CartItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Cart(props) {
  const cart = useSelector((state) => state.cart.cart);
  // const [coupon, setCoupon] = useState();

  return (
    <div className="cart">
      <div className="cart-title">
        <h2>Cart</h2>
        <p>
          {"("}
          {Object.keys(cart).length}
          {")"}
        </p>
        <button className="close" onClick={() => props.setCartOpen(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <CartItems />
      {/* <Coupon setCoupon={setCoupon} /> */}
      <CartSummary />
    </div>
  );
}
