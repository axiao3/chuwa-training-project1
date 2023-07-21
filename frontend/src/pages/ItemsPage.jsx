/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./style.css";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getItemsAmountAction } from "../app/itemsSlice";
import Sort from "../components/ItemList/Sort";
import CreateButton from "../components/ItemList/CreateButton";
import ItemsList from "../components/ItemList/ItemsList";

export default function ItemsPage() {
  const user = useSelector((state) => state.user.user);
  const [searchParams] = useSearchParams();
  const productName = searchParams.get('name');

  useEffect(() => {
    if (!Object.keys(user).length) {
      window.location.href = "/sign-in";
      return null;
    }
  }, [user]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemsAmountAction(productName));
  }, []);
  const items = useSelector((state) => state.items);

  const [sort, setSort] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  useEffect(
    () =>
      console.log(
        `now page is ${currentPage}, actual page is ${currentPage + 1}`
      ),
    [currentPage]
  );

  console.log("current user: ", user);



  return (
    <div className="items-page">
      <div className="title-row">
        <h2>Product</h2>
        <div>
          <Sort
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSort={setSort}
          />
          {user.type === "admin" ? <CreateButton /> : null}
        </div>
      </div>
      <ItemsList sort={sort} currentPage={currentPage} productName={productName} />
      <ReactPaginate
        pageCount={Math.max(1, Math.ceil(items.amount / 10))}
        marginPagesDisplayed={2}    
        pageRangeDisplayed={5}   
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={currentPage}
      />
    </div>
  );
}
