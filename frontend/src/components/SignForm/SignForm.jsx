/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import { signUpAction, signInAction, checkExistAction, updatePasswordAction } from "../../app/userSlice";

export default function SignForm(props) {
  //note: props.type="Sign In" || "Sign Up" || "Forget Password";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [userType, setUserType] = useState();
  const [emailWarning, setEmailWarning] = useState();
  const [passwordWarning, setPasswordWarning] = useState();
  const [newpasswordWarning, setNewPasswordWarning] = useState();
  const [userTypeWarning, setUserTypeWarning] = useState();
  const [actionWarning, setActionWarning] = useState();
  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailWarning && props.type === "Forget Password") {
      if (!user.isEmailExist) {
        dispatch(
          checkExistAction({email: email})
        ).then(() => console.log(user));
      } else {
        dispatch(
          updatePasswordAction({email: email, previous: password, current: newPassword})
        );
      }
    }

    if (!emailWarning && !passwordWarning) {
      if (props.type === "Sign In") {
        console.log("sign in statement");
        dispatch(
          signInAction({ email: email, password: password, userType: userType })
        ).then(console.log(user));
      } else if (!userTypeWarning && props.type === "Sign Up") {
        console.log("sign up statement");
        dispatch(
          signUpAction({ email: email, password: password, userType: userType })
        );
      } 
    }
  };

  const handleEmail = (e) => setEmail(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  const handleNewPassword = (e) => setNewPassword(e.target.value);

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
    if (user.status === "update succeeded") {
      waiting(1000).then(() => (window.location.href = "/sign-in"));
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
    setNewPasswordWarning(
      !newPassword || !passwordRegex.test(newPassword)
        ? "Invalid Password input!"
        : null
    );
    setUserTypeWarning(!userType ? "User type is required!" : null);
  }, [email, password, newPassword, userType]);

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <Email handleEmail={handleEmail} warning={emailWarning} />

      {props.type !== "Forget Password" ? (
        <Password title="Password" id="password" handlePassword={handlePassword} warning={passwordWarning} />
      ) : null}

      {(props.type === "Forget Password" && user.isEmailExist) ? (
        <>
        <Password title="Previous Password" id="previous" handlePassword={handlePassword} warning={passwordWarning} />
        <Password title="Set New Password" id="current" handlePassword={handleNewPassword} warning={newpasswordWarning} />
        </>
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
    </form>
  );
}
