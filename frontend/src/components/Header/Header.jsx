import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const handleSignIn = () => (window.location.href = "/sign-in");
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
            <p>Amount</p>
          </button>
        </div>
      </nav>
    </header>
  );
}
