import React, { useState, useEffect } from "react";
import "./style.css";
import ReactPaginate from "react-paginate";
import OneItem from "../components/ItemList/OneItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsAction } from "../app/itemsSlice";

export default function ItemsPage() {
  const user = useSelector((state) => state.user.user);

  if (!Object.keys(user).length) {
    window.location.href = "/sign-in";
    return null;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItemsAction());
  }, []);
  const items = useSelector((state) => state.items.items);

  return (
    <div className="items-page">
      <h2>Product</h2>
      <div className="items-container">
        {items
          ? Object.entries(items).map(([_id, item]) => (
              <OneItem key={_id} item={item} />
            ))
          : null}
      </div>
    </div>
  );
}
