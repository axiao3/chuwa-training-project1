import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { cartDecrementAction, cartIncrementAction } from "../../app/cartSlice";

export default function AddButton(props) {
  //props.quantity,props.itemId
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(cartIncrementAction({ itemId: props.itemId, quantity: 1 }));
  };

  const handleRemove = () => {
    dispatch(cartDecrementAction({ itemId: props.itemId, quantity: 1 }));
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
