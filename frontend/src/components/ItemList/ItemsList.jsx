/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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

  return items ? (
    <div className="items-container">
      <div>
        {Object.entries(items)
          .slice(0, 5)
          .map(([key, item]) => (
            <OneItem key={key} item={item} />
          ))}
      </div>
      <div>
        {Object.entries(items)
          .slice(5)
          .map(([key, item]) => (
            <OneItem key={key} item={item} />
          ))}
      </div>
    </div>
  ) : null;
}
