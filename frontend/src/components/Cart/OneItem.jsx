/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./style.css";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OneItem from "../Cart/OneItem";
import { getOneItem } from "../../services/item";
import AddButton from "../ItemList/AddButton";
import { cartDecrementAction } from "../../app/cartSlice";

export default function CartItems(props) {
  //props.item

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const [itemInfo, setItemInfo] = useState();
  useEffect(() => {
    console.log(props);
    const getItemInfo = async () => {
      const info = await getOneItem(props.itemId);
      setItemInfo(info);
    };

    getItemInfo();
  }, []);

  const handleRemove = () => {
    dispatch(
      cartDecrementAction({
        itemId: props.itemId,
        quantity: cart[props.itemId].quantity,
      })
    );
  };

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
          <button className="remove-button" onClick={handleRemove}>
            remove
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
