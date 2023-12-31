/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { cartDecrementAction, cartIncrementAction } from "../../app/cartSlice";
import { getOneItem } from "../../services/item";

export default function AddButton(props) {
  //props.itemId
  const {cart, status} = useSelector((state) => state.cart);
  // const item = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (status.includes("succeeded")) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [status])

  const handleAdd = async() => {
    // console.log(666,props.itemId, item, cart[props.itemId]);
    const addedQuantity = cart[props.itemId]
      ? cart[props.itemId].quantity + 1
      : 1;
      const item = await getOneItem(props.itemId);
    if (addedQuantity <= item.quantity)
      dispatch(cartIncrementAction({ itemId: props.itemId, quantity: 1 }));
    else alert(`Max Stock of ${item.name} is ${item.quantity}`);
  };

  const handleRemove = () => {
    dispatch(cartDecrementAction({ itemId: props.itemId, quantity: 1 }));
  };

  return !cart[props.itemId] ? (
    <div className="add-button">
      <button  disabled={disable} onClick={handleAdd}>Add</button>
    </div>
  ) : (
    <div className="add-button">
      <button disabled={disable} onClick={handleRemove} style={{ fontSize: "1.2rem" }}>
        -
      </button>
      <p>{cart[props.itemId].quantity}</p>
      <button disabled={disable} onClick={handleAdd} style={{ fontSize: "1.2rem" }}>
        +
      </button>
    </div>
  );
}
