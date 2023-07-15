import axios from "axios";
const apiUrl = "http://localhost:8080";

export function signUp(email, password, type) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}/signup`, {
        email: email,
        password: password,
        type: type,
      })
      .then((response) => {
        console.log(response.data);
        resolve({
          status: true,
          message: `sign up successfully! Relocate to login...`,
        });
      })
      .catch((err) => {
        reject({ status: false, message: err.response.data.error.message });
      });
  });
}

export function signIn(email, password) {
  // console.log("Sign in services SignIn");
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}/signin`, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        alert("Signed in successfully!");
        resolve({
          status: true,
          message: `sign in successfully! Relocate to Product list page...`,
          email: email,
          token: response.data.token,
        });
      })
      .catch((err) => {
        alert("Wrong email /password.");
        console.log(err.response.data.error.message);
        reject(err.response.data.error.message);
      });
  });
}

export function logOut(key, value) {
  if (key) {
    //if there is such a user signed in, log it out
    alert("Logged out.");
    localStorage.clear();
  }
  console.log("log out: " + key + value);
}
