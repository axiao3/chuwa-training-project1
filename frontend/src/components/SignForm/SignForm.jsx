import React, { useState, useEffect } from "react";
import "./style.css";
import Email from "./EmailInput";
import Password from "./PasswordInput";
import UserType from "./UserType";

export default function SignForm(props) {
  //note: props.type="Sign In" || "Sign Up" || "Forget Password";
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState();
  const [emailWarning, setEmailWarning] = useState();
  const [passwordWarning, setPasswordWarning] = useState();
  const [userTypeWarning, setUserTypeWarning] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailWarning && !passwordWarning && !userTypeWarning) {
      if (props.type === "Sign Up") {
        console.log(email, password, userType);
      }
    }
  };

  const handleEmail = (e) => setEmail(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  const handleUserType = (user) => setUserType(user);

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
  }, [email, password, userType]);

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <Email handleEmail={handleEmail} warning={emailWarning} />
      {props.type !== "Forget Password" ? (
        <Password handlePassword={handlePassword} warning={passwordWarning} />
      ) : null}
      {props.type === "Sign Up" ? (
        <UserType handleUserType={handleUserType} warning={userTypeWarning} />
      ) : null}
      <button type="submit">{props.type}</button>
    </form>
  );
}
