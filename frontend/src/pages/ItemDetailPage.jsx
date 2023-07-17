import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneItemAction } from "../app/itemsSlice";
import { cartIncrementAction, cartDecrementAction } from "../app/cartSlice";
import AddButton from "../components/ItemList/AddButton";
import EditButton from "../components/ItemList/EditButton";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ItemDetailPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  //const oneItem = useSelector((state) => state.items.items);
  //zixin modify:
  //line18直接从item store里取到oneItem的值！sorry我当时忘记了,让你白fetch一遍（T^T）
  //这样修改的原因是：你fetch One首先多叫了一次不必要的后端。
  //其次，我add button加了stock限制之后，这个地方add不了，好像因为fetchOne存入的格式和我之前fetchAll存的格式不一样。
  //fetchAll存的：state.items= {itemId:{item Info Object}}
  const { id } = useParams();
  const oneItem = useSelector((state) => state.items.items)[id]

  console.log("user in itemDetailPage: ", user.user, user.user.type);

  const navigate = useNavigate();

  useEffect(() => {
    if (!Object.keys(user).length) {
      navigate("/sign-in");
      return null;
    }
  }, [user]);

  //zixin modify:不好意思感觉fetchOne让你白写了！我觉得你这个item可以直接从Line18拿
  //user: cart/item/user
  //const { id } = useParams();
  // useEffect(() => {
  //   dispatch(fetchOneItemAction(id));
  // }, []);

  console.log("item returned into detail page: ", oneItem);

  return (
    <div className="item-detail-page">
      <h2>Products Detail</h2>
      <div className="item-detail-container">
        <div className="item-detail-imgContainer">
          <img src={oneItem.link} className="item-detail-img"></img>
        </div>
        <div className="item-detail-vertical">
          <div className="item-detial-info">
            <p className="item-detail-text">{oneItem.category}</p>
            <h2 className="item-detail-name"> {oneItem.name} </h2>
            <div className="item-detail-horizontal">
              <h2 className="item-detail-price">${oneItem.price}</h2>
              {oneItem.quantity <= 0 ? (
                <div className="item-detail-outOfStock">Out of Stock</div>
              ) : null}
            </div>
            <p className="item-detail-text">{oneItem.description}</p>
          </div>
          <div className="item-detail-actions">
            {oneItem.quantity <= 0 ? (
              <AddButton
                itemId={id}
                className="item-detail-add"
                disable={true}
                // style={{ pointerEvents: "none" }}
              />
            ) : (
              <AddButton itemId={id} className="item-detail-add" />
            )}

            {user.user.type === "admin" ? (
              <EditButton itemId={oneItem._id} className="item-detail-edit" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
