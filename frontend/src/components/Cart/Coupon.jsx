import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

export default function Coupon(props) {
  const [coupon, setCoupon] = useState();
  const handleSubmit = () => {
    props.setCoupon(coupon);
  };
  return (
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
  );
}
