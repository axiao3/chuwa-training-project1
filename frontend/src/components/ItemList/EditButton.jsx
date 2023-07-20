/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function EditButton(props) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/items/${props.itemId}/edit`);
  };

  return (
    <button className="edit-button" onClick={handleEdit}>
      Edit / Delete
    </button>
  );
}
