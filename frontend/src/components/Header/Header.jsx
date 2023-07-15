import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAction } from "../../app/cartSlice";

export default function Header() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const handleSignIn = () => (window.location.href = "/sign-in");

  useEffect(() => {
    dispatch(fetchCartAction());
  }, []);

  return (
    <header>
      <nav>
        <p
          className="nav-item"
          style={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          M<span className="hidden">anagement</span>
          <span style={{ marginLeft: "0.2rem", fontSize: "0.8rem" }}>
            Chuwa
          </span>
        </p>
        <form className="nav-item">
          <input type="text" />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <div className="nav-item">
          <button onClick={handleSignIn}>
            <FontAwesomeIcon icon={faUser} />
            <p className="hidden">Sign In</p>
          </button>
          <button>
            <FontAwesomeIcon icon={faShoppingCart} />
            <p>${cart.totalPrice ?? 0.00}</p>
          </button>
        </div>
      </nav>
    </header>
  );
}
