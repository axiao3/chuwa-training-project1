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
    <div className="detail-page">
      <h2>Products Detail</h2>
      <div className="detail-container">
        <div>
          <img src={oneItem[id]?.link} className="item-detail-img"></img>
        </div>
        <div className="info-container">
          <p className="secondary">{oneItem[id]?.category}</p>
          <h2 className="primary"> {oneItem[id]?.name} </h2>
          <div>
            <h2>${oneItem[id]?.price}</h2>
            {oneItem[id]?.quantity <= 0 ? (
              <div className="warning">Out of Stock</div>
            ) : null}
          </div>
          <div className="description secondary">
            {oneItem[id]?.description}
          </div>

          <div>
            {oneItem[id]?.quantity <= 0 ? (
              <AddButton
                itemId={id}
                disable={true}
                // style={{ pointerEvents: "none" }}
              />
            ) : (
              <AddButton itemId={id} />
            )}

            {user.type === "admin" ? <EditButton itemId={id} /> : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
