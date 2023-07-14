import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

export default function AddButton(props) {
  //props.quantity,props.itemId
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = { _id: "64adf80caf5e77b6b530b516" }; //test
  //const { user } = useSelector((state) => state.user);

  const handleAdd = () => {
    dispatch(
      AddItem({
        userId: user._id,
        itemId: props.itemId,
        quantity: cart[props.itemId] ? cart[props.itemId].quantity + 1 : 1,
      })
    ).then(() => {
      console.log("added");
    });
  };

  const handleRemove = () => {
    //axios.post to add quantity //should return a sum of value
  };

  return !cart[props.itemId] ? (
    <div className="add-button">
      <button onClick={handleAdd}>Add</button>
    </div>
  ) : (
    <div className="add-button">
      <button onClick={handleRemove}>-</button>
      <p>{cart[props.itemId].quantity}</p>
      <button onClick={handleAdd}>+</button>
    </div>
  );
}
