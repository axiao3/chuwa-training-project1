/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import NewItem from "../components/NewItem/NewItem";
import { createItemAction } from "../app/itemsSlice";
import { fetchOneItemAction } from "../app/itemsSlice";

export default function CreateItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const itemsSlice = useSelector((state) => state.items);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in", { state: { from: "/items/create" } });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (itemsSlice.status === "create succeeded") {
      alert("Creat Item success");
      navigate("/items");
    }
  }, [itemsSlice.status, navigate]);

  const handleSubmit = (e, name, description, category, price, quantity, link) => {
    e.preventDefault();
    dispatch(
      createItemAction({user_id: user.id, name, description, category, price, quantity, link})
    );
  };

  return user.type === "admin" ? (
    <NewItem
      title="Create Product"
      button="Add Product"
      name=""
      description=""
      category=""
      price=""
      quantity=""
      link="http://"
      imagePreview="default-image-link"
      isPreview={false}
      onSubmit={handleSubmit}
    />
  ) : <Navigate to="/items" />;
}
