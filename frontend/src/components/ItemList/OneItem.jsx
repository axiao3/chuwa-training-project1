import React, { useState, useEffect } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditButton from "./EditButton";
import AddButton from "./AddButton";
import { getItemQuantityInCart } from "../../services/cart";

export default function OneItem(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  console.log(123, cart);
  const user = { _id: "64adf80caf5e77b6b530b516", type: "admin" }; //test
  //const { user } = useSelector((state) => state.user);

  const [quantity, setQuantity] = useState();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  useEffect(() => {
    const getQuantity = async () => {
      try {
        const quantity = cart[props.item._id]?.quantity;
        // const quantity = await getItemQuantityInCart(user._id, props.item._id);
        setQuantity(quantity ? quantity : 0);
      } catch (error) {
        console.error("Error fetching quantity:", error);
      }
    };

    getQuantity();
  }, []);

  return (
    <div className="item">
      <img src={props.item.link}></img>
      <p className="item-name"> {props.item.name} </p>
      <p className="item-price">${props.item.price}</p>
      <div className="buttons-container">
        <AddButton quantity={quantity} itemId={props.item._id} />
        {user.type === "admin" ? <EditButton itemId={props.item._id} /> : null}
      </div>
    </div>
  );
}
