/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import NewItem from "../components/NewItem/NewItem";
import { editItemAction } from "../app/itemsSlice";
import { fetchOneItemAction } from "../app/itemsSlice";

export default function EditItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  //   const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { items, status: itemStatus } = useSelector((state) => state.items);

  //   const id = location.state.item_id;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in", { state: { from: `/items/${id}/edit` } });
      // return <Navigate to="/sign-in" state={{ from: `/items/${id}/edit` }} />;   // useEffect no return
    } 
    dispatch(fetchOneItemAction(id));
  }, []);

  useEffect(() => {
    // console.log("itemState.status: ", itemState.status);
    if (itemStatus === "edit succeeded") {
      alert("Edit Item success");
      navigate("/items");
    }
  }, [itemStatus, navigate]);

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

  return items[id] ? (
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
  ) : null;
}
