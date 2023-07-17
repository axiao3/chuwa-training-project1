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
import { logOutUser } from "../../app/userSlice";
import Cart from "../Cart/Cart";

export default function Header() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatch(fetchCartAction());
    }
  }, []);

  const cart = useSelector((state) => state.cart);

  const handleSignIn = () => {
    window.location.href = "/sign-in";
  };

  const handleLogOut = () => {
    dispatch(logOutUser());
    window.location.href = "/sign-in";
  };

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
          {isAuthenticated ? (
            <button onClick={handleLogOut}>
              <FontAwesomeIcon icon={faUser} />
              <p className="hidden" id="display">
                Log Out
              </p>
            </button>
          ) : (
            <button onClick={handleSignIn}>
              <FontAwesomeIcon icon={faUser} />
              <p className="hidden" id="display">
                Sign In
              </p>
            </button>
          )}

          <button onClick={() => setCartOpen((prevCartOpen) => !prevCartOpen)}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <p>${cart.totalPrice ?? 0.0}</p>
          </button>
        </div>
      </nav>
      {cartOpen ? <Cart setCartOpen={setCartOpen} /> : null}
    </header>
  );
}
