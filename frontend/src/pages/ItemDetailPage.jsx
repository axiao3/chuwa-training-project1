/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneItemAction } from "../app/itemsSlice";
import AddButton from "../components/ItemList/AddButton";
import EditButton from "../components/ItemList/EditButton";
import { useParams } from "react-router-dom";

export default function ItemDetailPage() {
  const user = useSelector((state) => state.user.user);
  const { id } = useParams();
  const oneItem = useSelector((state) => state.items.items);
  console.log("user in itemDetailPage: ", user.user, user.type);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!Object.keys(user).length) {
      window.location.href = "/sign-in";
      return null;
    }
  }, []);

  useEffect(() => {
    dispatch(fetchOneItemAction(id));
  }, []);

  console.log("item returned into detail page: ", oneItem[id]);

  return oneItem[id] ? (
    <div className="item-detail-page">
      <h2>Products Detail</h2>
      <div className="item-detail-container">
        <div className="item-detail-imgContainer">
          <img src={oneItem[id]?.link} className="item-detail-img"></img>
        </div>
        <div className="item-detail-vertical">
          <div className="item-detial-info">
            <p className="item-detail-text">{oneItem[id]?.category}</p>
            <h2 className="item-detail-name"> {oneItem[id]?.name} </h2>
            <div className="item-detail-horizontal">
              <h2 className="item-detail-price">${oneItem[id]?.price}</h2>
              {oneItem[id]?.quantity <= 0 ? (
                <div className="item-detail-outOfStock">Out of Stock</div>
              ) : null}
            </div>
            <p className="item-detail-text">{oneItem[id]?.description}</p>
          </div>
          <div className="item-detail-actions">
            {oneItem[id]?.quantity <= 0 ? (
              <AddButton
                itemId={id}
                className="item-detail-add"
                disable={true}
                // style={{ pointerEvents: "none" }}
              />
            ) : (
              <AddButton itemId={id} className="item-detail-add" />
            )}

            {user.type === "admin" ? (
              <EditButton itemId={id} className="item-detail-edit" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
