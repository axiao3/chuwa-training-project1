import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function CreateButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/items/create");
  };

  return (
    <button className="create-button" onClick={handleClick}>
      Add Product
    </button>
  );
}
