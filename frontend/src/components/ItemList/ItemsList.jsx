import React, { useState, useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import OneItem from "./OneItem";
import { fetchItemsAction } from "../../app/itemsSlice";

export default function ItemsList(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItemsAction({ sort: props.sort, page: props.currentPage }));
  }, [props.sort, props.currentPage]);
  const items = useSelector((state) => state.items.items);

  return (
    <div className="items-container">
      {items
        ? Object.entries(items).map(([_id, item]) => (
            <OneItem key={_id} item={item} />
          ))
        : null}
    </div>
  );
}
