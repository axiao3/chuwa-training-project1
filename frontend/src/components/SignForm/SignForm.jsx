import React, { useState, useEffect } from "react";
import "./style.css";
import Email from "./EmailInput";
import Password from "./PasswordInput";
import UserType from "./UserType";
import { signUp } from "../../services/auth";
import signIn from "../../services/SignIn";
// import logOut from "../../services/LogOut";
import waiting from "../../utils/waiting";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAction } from "../../app/cartSlice";
import { signUpAction, signInAction, logOutAction } from "../../app/userSlice";

export default function SignForm(props) {
  //note: props.type="Sign In" || "Sign Up" || "Forget Password";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState();
  const [emailWarning, setEmailWarning] = useState();
  const [passwordWarning, setPasswordWarning] = useState();
  const [userTypeWarning, setUserTypeWarning] = useState();
  const [actionWarning, setActionWarning] = useState();
  const [login, setLogin] = useState();
  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailWarning && !passwordWarning) {
      if (props.type === "Sign In") {
        console.log(email, password);
        dispatch(
          signInAction({ email: email, password: password, userType: userType })
        ).then(console.log(user));
      }
    }
    if (!emailWarning && !passwordWarning && !userTypeWarning) {
      if (props.type === "Sign Up") {
        dispatch(
          signUpAction({ email: email, password: password, userType: userType })
        );
        //const registerResponse = await signUp(email, password, userType);
        //setRegister(registerResponse);
        // setRegister(true);
      }
    }
  };

  const handleEmail = (e) => setEmail(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  const handleUserType = (user) => setUserType(user);

  useEffect(() => {
    if (user.status !== "idle") setActionWarning(user.status);
    if (user.status === "Sign up succeeded") {
      waiting(1000).then(() => (window.location.href = "/sign-in"));
    }
    if (user.status === "Sign in succeeded") {
      waiting(1000).then(() => {
        dispatch(fetchCartAction());
        navigate("/items");
      });
    }
  }, [user.status]);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?!.*\s).{8,16}$/; // length 8-16, cannot contain spaces
    setEmailWarning(!emailRegex.test(email) ? "Invalid Email input!" : null);
    setPasswordWarning(
      !password || !passwordRegex.test(password)
        ? "Invalid Password input!"
        : null
    );
    setUserTypeWarning(!userType ? "User type is required!" : null);
  }, [email, password, userType, login]);

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <Email handleEmail={handleEmail} warning={emailWarning} />

      {props.type !== "Forget Password" ? (
        <Password handlePassword={handlePassword} warning={passwordWarning} />
      ) : null}

      {props.type === "Sign Up" ? (
        <UserType handleUserType={handleUserType} warning={userTypeWarning} />
      ) : null}

      {actionWarning ? (
        <p style={{ color: "#FC5A44", textAlign: "center", margin: "0" }}>
          {actionWarning}
        </p>
      ) : null}

      <button type="submit">{props.type}</button>

      {login == undefined ? null : (
        <button type="reset" onClick={handleLogOut}>
          log out
        </button>
      )}
    </form>
  );
}
