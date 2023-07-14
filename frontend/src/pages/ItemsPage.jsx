import React, { useState, useEffect } from "react";
import "./style.css";
import ReactPaginate from "react-paginate";
import OneItem from "../components/ItemList/OneItem";
import { getItemsList } from "../services/item";
import { useDispatch, useSelector } from "react-redux";

export default function ItemsPage() {
  const user = useSelector((state) => state.user);
  const [list, setList] = useState();
  useEffect(() => {
    const fetchItemsList = async () => {
      try {
        const itemsList = await getItemsList();
        setList(itemsList);
      } catch (error) {
        console.error("Error fetching items list:", error);
      }
    };
    console.log("hahha", user);
    fetchItemsList();
  }, []);

  return (
    <div className="items-page">
      <h2>Product</h2>
      <div className="items-container">
        {list
          ? list.map((item) => <OneItem key={item._id} item={item} />)
          : null}
      </div>
    </div>
  );
}
