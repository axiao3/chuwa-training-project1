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
        <div className="item-detail-imgContainer">
          <img src={oneItem.link} className="item-detail-img"></img>
        </div>
        <div className="item-detail-vertical">
          <div className="item-detial-info">
            <p className="item-detail-text">{oneItem.category}</p>
            <h2 className="item-detail-name"> {oneItem.name} </h2>
            <div className="item-detail-horizontal">
              <h2 className="item-detail-price">${oneItem.price}</h2>
              {oneItem.quantity <= 0 ? (
                <div className="item-detail-outOfStock">Out of Stock</div>
              ) : null}
            </div>
            <p className="item-detail-text">{oneItem.description}</p>
          </div>
          <div className="item-detail-actions">
            {oneItem.quantity <= 0 ? (
              <AddButton
                itemId={id}
                className="item-detail-add"
                disable={true}
                // style={{ pointerEvents: "none" }}
              />
            ) : (
              <AddButton itemId={id} className="item-detail-add" />
            )}

            {user.user.type === "admin" ? (
              <EditButton itemId={oneItem._id} className="item-detail-edit" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
