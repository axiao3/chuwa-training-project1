import React, { useState, useEffect } from "react";
import "./style.css";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OneItem from "../Cart/OneItem";
import { getOneItem } from "../../services/item";
import AddButton from "../ItemList/AddButton";

export default function CartItems(props) {
  //props.item

  const [itemInfo, setItemInfo] = useState();
  useEffect(() => {
    console.log(props);
    const getItemInfo = async () => {
      const info = await getOneItem(props.itemId);
      setItemInfo(info);
    };

    getItemInfo();
  }, []);

  return itemInfo ? (
    <div className="one-item">
      <img src={itemInfo.link}></img>
      <div className="right">
        <div>
          <p className="item-name"> {itemInfo.name} </p>
          <p className="item-price">${itemInfo.price}</p>
        </div>
        <div>
          <AddButton itemId={props.itemId} />
          <button className="remove-button">remove</button>
        </div>
      </div>
    </div>
  ) : null;
}
