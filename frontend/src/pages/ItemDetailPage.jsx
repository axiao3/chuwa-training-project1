import React, { useState, useEffect } from "react";
import "./style.css";
import OneItem from "../components/ItemList/OneItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsAction } from "../app/itemsSlice";

export default function ItemDetailPage() {
    const dispatch = useDispatch();
  
    useEffect(() => {
      
    }, []);
  
    return (
      <div className="item-detail-page">
        <h2>Products Detail</h2>
        <div className="items-container">
          
        </div>
      </div>
    );
  }