import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsAction } from "../../app/itemsSlice";

export default function Sort(props) {
  const [sort, setSort] = useState(0);

  useEffect(() => {
    props.setSort(sort);
    props.setCurrentPage(0);
  }, [sort]);

  return (
    <select
      className="sort"
      onChange={(e) => {
        setSort(e.target.value);
      }}
    >
      <option value="0">Last added</option>
      <option value="1">Price: Low to High</option>
      <option value="-1">Price: High to low</option>
    </select>
  );
}
