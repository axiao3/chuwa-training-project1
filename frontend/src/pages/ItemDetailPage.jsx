/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneItemAction } from "../app/itemsSlice";
import { cartIncrementAction, cartDecrementAction } from "../app/cartSlice";
import AddButton from "../components/ItemList/AddButton";
import EditButton from "../components/ItemList/EditButton";
import { useParams } from "react-router-dom";

export default function ItemDetailPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const oneItem = useSelector((state) => state.items.items);

  console.log("user in itemDetailPage: ", user.user, user.user.type);

  if (!Object.keys(user.user).length) {
    window.location.href = "/sign-in";
    return null;
  }

  //user: cart/item/user
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchOneItemAction(id));
  }, []);

  console.log("item returned into detail page: ", oneItem);

  return (
    <div className="item-detail-page">
      <h2>Products Detail</h2>
      <div className="item-detail-container">
        <img src={oneItem.link} style={{ height: "30%", width: "30%" }}></img>
        <p className="item-name"> {oneItem.name} </p>
        <p className="item-price">${oneItem.price}</p>
        <AddButton
          itemId={id}
          className="item-detail-item"
          style={{ width: "10%" }}
        />
        {user.user.type === "admin" ? (
          <EditButton itemId={oneItem._id} />
        ) : null}
      </div>
    </div>
  );
}
