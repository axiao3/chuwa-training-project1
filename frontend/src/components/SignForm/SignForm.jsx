/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Email from "./EmailInput";
import Password from "./PasswordInput";
import UserType from "./UserType";
import waiting from "../../utils/waiting";
import { fetchCartAction } from "../../app/cartSlice";
import { signUpAction, signInAction, checkExistAction, updatePasswordAction } from "../../app/userSlice";

export default function SignForm(props) {
  //note: props.type="Sign In" || "Sign Up" || "Update Password";
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  useEffect(() => {}, [user]);

  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [userType, setUserType] = useState();
  const [emailWarning, setEmailWarning] = useState();
  const [passwordWarning, setPasswordWarning] = useState();
  const [newpasswordWarning, setNewPasswordWarning] = useState();
  const [actionWarning, setActionWarning] = useState();

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailWarning(!emailRegex.test(email) ? "Invalid Email input!" : null);
    setEmailTouched(true);
  };
  
  const handlePasswordBlur = () => {
    const passwordRegex = /^(?!.*\s).{8,16}$/;
    setPasswordWarning(
      !password || !passwordRegex.test(password)
        ? "Invalid Password input!"
        : null
    );
    setPasswordTouched(true);
  };

  const handleNewPasswordBlur = () => {
    const passwordRegex = /^(?!.*\s).{8,16}$/;
    setNewPasswordWarning(
      !newPassword || !passwordRegex.test(newPassword)
        ? "Invalid Password input!"
        : null
    );
    setNewPasswordTouched(true);
  };

  const handleEmail = (e) => setEmail(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  const handleNewPassword = (e) => setNewPassword(e.target.value);

  const handleUserType = (user) => setUserType(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailWarning && props.type === "Update Password") {
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
        dispatch(signInAction({ email: email, password: password })).then(() =>
          dispatch(fetchCartAction())
        );
      } else if (userType && props.type === "Sign Up") {
        console.log("sign up statement");
        dispatch(
          signUpAction({ email: email, password: password, userType: userType })
        );
      } 
    }
  };

  useEffect(() => {
    if (user.status !== "idle") setActionWarning(user.status);
    if (user.status === "Sign up succeeded") {
      waiting(1000).then(() => (window.location.href = "/sign-in"));
    }
    if (user.status === "Sign in succeeded") {
      waiting(1500).then(() => {
        navigate(location.state?.from || "/items");
      });
    }
    if (user.status === "update succeeded") {
      waiting(1000).then(() => (window.location.href = "/sign-in"));
    }
  }, [user.status]);

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <Email handleEmail={handleEmail} warning={emailTouched ? emailWarning : null} onBlur={handleEmailBlur} />

      {props.type !== "Update Password" ? (
        <Password title="Password" id="password" handlePassword={handlePassword} warning={passwordTouched ? passwordWarning : null} onBlur={handlePasswordBlur} />
      ) : null}

      {(props.type === "Update Password" && user.isEmailExist) ? (
        <>
        <Password title="Previous Password" id="previous" handlePassword={handlePassword} warning={passwordTouched ? passwordWarning : null} onBlur={handlePasswordBlur} />
        <Password title="Set New Password" id="current" handlePassword={handleNewPassword} warning={newPasswordTouched ? newpasswordWarning : null} onBlur={handleNewPasswordBlur} />
        </>
      ) : null}  

      {props.type === "Sign Up" ? (
        <UserType handleUserType={handleUserType}/>
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
