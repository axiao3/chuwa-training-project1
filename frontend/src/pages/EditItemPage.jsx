/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import NewItem from "../components/NewItem/NewItem";
import { editItemAction } from "../app/itemsSlice";

export default function EditItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
//   const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const itemsSlice = useSelector((state) => state.items);
  
//   const id = location.state.item_id;
//   const id = "64b715ef90d747abcc4b1033";

//   console.log("items: ", itemsSlice.items);
  console.log("user: ", user);
  const item = itemsSlice.items[id];
  console.log("item: ", item);

  const handleSubmit = (e, name, description, category, price, quantity, link) => {
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
    if (itemsSlice.status === "edit succeeded") {
      alert("Edit Item success");
      navigate("/items");
    }
  }, [itemsSlice.status, navigate]);

  return (
    <NewItem
      title="Edit Product"
      button="Edit Product"
      name={item.name}
      description={item.description}
      category={item.category}
      price={item.price}
      quantity={item.quantity}
      link={item.link}
      imagePreview={item.link}
      isPreview={true}
      onSubmit={handleSubmit}
    />
  );
}
