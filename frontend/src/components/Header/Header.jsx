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
import logOut from "../../services/LogOut";

export default function Header() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (Object.keys(user.user).length !== 0) dispatch(fetchCartAction());
  }, []);

  const handleSignIn = () => {
    if (localStorage.getItem("email") && localStorage.getItem("token")) {
      setDisplay("Log Out");
      document.getElementById("display").innerHTML = display;
      logOut(localStorage.getItem("email"), localStorage.getItem("token"));
      console.log("sign in -> log out");
    } else {
      setDisplay("Sign In");
      document.getElementById("display").innerHTML = display;
    }

    window.location.href = "/sign-in";
  };

  // useEffect(() => {
  //   if (localStorage.getItem("email") && localStorage.getItem("token")) {
  //     console.log("sign in -> log out");
  //     display = "Log Out";
  //     document.getElementById("display").innerHTML = "Log Out";
  //   }else{
  //     console.log("log out -> sign in");
  //     display = "Sign In";
  //     document.getElementById("display").innerHTML = "Sign In";
  //   }
  // }, [localStorage.getItem("email"), localStorage.getItem("token")]);

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
          {localStorage.getItem("token") ? (
            <button onClick={handleSignIn}>
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

          <button>
            <FontAwesomeIcon icon={faShoppingCart} />
            <p>${cart.totalPrice ?? 0.0}</p>
          </button>
        </div>
      </nav>
    </header>
  );
}
