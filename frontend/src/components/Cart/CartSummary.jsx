/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

export default function CartSummary() {
  //props.quantity,props.itemId
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const [discount, setDiscount] = useState(0);

  const [coupon, setCoupon] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (coupon === "CHUWA") {
      setDiscount(totalPrice * 0.1);
    } else {
      setDiscount(0);
    }
  };

  return (
    <div className="cart-summary">

      <form className="coupon-form" onSubmit={handleSubmit}>
      <label htmlFor="coupon">Apply Discount Code</label>
      <div>
        <input
          type="text"
          id="coupon"
          placeholder="20 DOLLAR OFF"
          onChange={(e) => {
            setCoupon(e.target.value);
          }}
        ></input>
        <button type="submit"> Apply</button>
      </div>
    </form>

      <p>
        <b>Subtotal </b>
        <b>${totalPrice.toFixed(2)}</b>
      </p>
      <p>
        <b>Tax </b>
        <b>${(totalPrice * 0.06).toFixed(2)}</b>
      </p>
      <p>
        <b>Discount </b>
        <b>-${discount.toFixed(2)} </b>
      </p>
      <p>
        <b>Estimated Total </b>
        <b>${(totalPrice * 1.06 - discount).toFixed(2)} </b>
      </p>
      <button>Continue to Checkout</button>
    </div>
  );
}
