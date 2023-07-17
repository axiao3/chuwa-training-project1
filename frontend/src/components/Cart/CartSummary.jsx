import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

export default function CartSummary() {
  //props.quantity,props.itemId
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const [discount, setDiscount] = useState(0);
  return (
    <div className="cart-summary">
      <p>
        <b>Subtotal </b>
        <b>${totalPrice}</b>
      </p>
      <p>
        <b>Tax </b>
        <b>${totalPrice * 0.06}</b>
      </p>
      <p>
        <b>Discount </b>
        <b>-${"discount"} </b>
      </p>
      <p>
        <b>Estimated Total </b>
        <b>${totalPrice * 1.06 - discount} </b>
      </p>
      <button>Continue to Checkout</button>
    </div>
  );
}
