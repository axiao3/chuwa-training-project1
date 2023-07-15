import React, { useState, useEffect } from "react";
import "./style.css";
import Email from "./EmailInput";
import Password from "./PasswordInput";
import UserType from "./UserType";
import { signUp } from "../../services/auth";
import signIn from "../../services/SignIn";
import logOut from "../../services/LogOut";
import waiting from "../../utils/waiting";
import { useNavigate } from "react-router-dom";

export default function SignForm(props) {
  //note: props.type="Sign In" || "Sign Up" || "Forget Password";
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState();
  const [emailWarning, setEmailWarning] = useState();
  const [passwordWarning, setPasswordWarning] = useState();
  const [userTypeWarning, setUserTypeWarning] = useState();
  const [register, setRegister] = useState();
  const [login, setLogin] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailWarning && !passwordWarning) {
      if (props.type === "Sign In") {
        console.log(email, password);
        const loginResponse = await signIn(email, password);
        setLogin({
          email: loginResponse.email,
          signInToken: loginResponse.token,
        });
        console.log(
          "logged in: " + login?.email + " token: " + login?.signInToken
        );
      }
    }
    if (!emailWarning && !passwordWarning && !userTypeWarning) {
      if (props.type === "Sign Up") {
        console.log(email, password, userType);
        const registerResponse = await signUp(email, password, userType);
        setRegister(registerResponse);
      }
    }
  };

  const handleEmail = (e) => setEmail(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  const handleUserType = (user) => setUserType(user);

  const handleLogOut = () => {
    logOut(login?.email);
    setLogin();
  };

  useEffect(() => {
    if (register !== undefined && register.status) {
      waiting(1000).then(() => (window.location.href = "/sign-in"));
    }
  }, [register]);

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

  useEffect(() => {
    if (login !== undefined && login.email && login.signInToken) {
      localStorage.setItem("token", login.signInToken);
      localStorage.setItem("email", login.email);

      /* Zixin: href to items page */
      navigate("/items");
    }
  }, [login]);

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <Email handleEmail={handleEmail} warning={emailWarning} />
      {props.type !== "Forget Password" ? (
        <Password handlePassword={handlePassword} warning={passwordWarning} />
      ) : null}
      {props.type === "Sign Up" ? (
        <UserType handleUserType={handleUserType} warning={userTypeWarning} />
      ) : null}
      {register !== undefined ? <p>{register.message}</p> : null}
      <button type="submit">{props.type}</button>
      {login == undefined ? null : (
        <button type="reset" onClick={handleLogOut}>
          log out
        </button>
      )}
    </form>
  );
}
