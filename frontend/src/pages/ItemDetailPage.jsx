import React, { useState, useEffect } from "react";
import "./style.css";
import OneItem from "../components/ItemList/OneItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsAction } from "../app/itemsSlice";
import { cartIncrementAction, cartDecrementAction } from "../app/cartSlice";
import AddButton from "../components/ItemList/AddButton";
import { useParams } from "react-router-dom";

export default function ItemDetailPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (!Object.keys(user.user).length) {
    window.location.href = "/sign-in";
    return null;
  }

  //user: cart/item/user
  const { id } = useParams();
  const handleIncrement = () => {
    dispatch(cartIncrementAction);
  };
  //handle decrement

  return (
    <div className="item-detail-page">
      <h2>Products Detail</h2>
      <div className="items-container">
        {/* <button onClick={handleIncrement}>+</button> */}
        <AddButton itemId={id} style={{ width: "200px" }} />
      </div>
    </div>
  );
}
