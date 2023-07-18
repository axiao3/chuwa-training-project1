/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewItem from "../components/NewItem/NewItem";
import { createItemAction } from "../app/itemsSlice";

export default function CreateItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleSubmit = (
    name,
    description,
    category,
    price,
    quantity,
    imageUrl
  ) => {
    dispatch(
      createItemAction({
        user_id: user.user.id,
        name,
        description,
        category,
        price,
        quantity,
        imageUrl,
      })
    ).then(() => {
      navigate("/items");
    });
  };

  return (
    <NewItem
      title="Create Product"
      button="Add Product"
      name=""
      description=""
      category=""
      price=""
      quantity=""
      imageUrl="http://"
      imagePreview="default-image-link"
      isPreview={false}
      onSubmit={handleSubmit}
    />
  );
}
