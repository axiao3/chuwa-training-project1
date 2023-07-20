/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
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
  console.log("itemsSlice.items: ", itemsSlice.items);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in", { state: { from: '/items/create' } });
      // return <Navigate to="/sign-in" state={{ from: '/items/create' }} />;   // useEffect no return;
    }
    // dispatch(fetchOneItemAction(id));
  }, []);

  const handleSubmit = (e, name, description, category, price, quantity, link) => {
    e.preventDefault();
    dispatch(
      createItemAction({
        user_id: user.id,
        name,
        description,
        category,
        price,
        quantity,
        link,
      })
    );
  };

  useEffect(() => {
    // console.log("itemState.status: ", itemState.status);
    if (itemsSlice.status === "create succeeded") {
      alert("Creat Item success");
      navigate("/items");
    }
  }, [itemsSlice.status, navigate]);

  return (
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
  );
}
