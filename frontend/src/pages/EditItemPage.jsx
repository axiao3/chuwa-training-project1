/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
import NewItem from "../components/NewItem/NewItem";
import { editItemAction } from "../app/itemsSlice";
import { fetchOneItemAction } from "../app/itemsSlice";

export default function EditItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  //   const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const { items, status } = useSelector((state) => state.items);

  //   const id = location.state.item_id;
  //   const id = "64b715ef90d747abcc4b1033";

  //   console.log("items: ", itemsSlice.items);

  if (!Object.keys(user).length) {
    return <Navigate to="/sign-in" state={{ from: `/items/${id}/edit` }} />;
  }

  useEffect(() => {
    dispatch(fetchOneItemAction(id));
  }, []);

  useEffect(() => {
    console.log("item I get: ", items);
  }, [items]);

  console.log("item returned into detail page: ", items[id]);
  console.log("user: ", user);

  console.log("item: ", items);

  const handleSubmit = (
    e,
    name,
    description,
    category,
    price,
    quantity,
    link
  ) => {
    e.preventDefault();
    dispatch(
      editItemAction({
        item_id: id,
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
    if (status === "edit succeeded") {
      alert("Edit Item success");
      navigate("/items");
    }
  }, [status, navigate]);

  return (
    <NewItem
      title="Edit Product"
      button="Edit Product"
      name={items[id].name}
      description={items[id].description}
      category={items[id].category}
      price={items[id].price}
      quantity={items[id].quantity}
      link={items[id].link}
      imagePreview={items[id].link}
      isPreview={true}
      onSubmit={handleSubmit}
    />
  );
}
