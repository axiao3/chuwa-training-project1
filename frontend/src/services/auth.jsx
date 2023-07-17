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
        });
      })
      .catch((err) => {
        reject({ status: false, message: err.response.data.error.message });
      });
  });
}

export function signIn(email, password, type) {
  // console.log("Sign in services SignIn");
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}/signin`, {
        email: email,
        password: password,
        type: type,
      })
      .then((response) => {
        resolve({
          email: email,
          token: response.data.token,
          type: response.data.type,
          id: response.data.id,
        });
      })
      .catch((err) => {
        reject({ status: false, message: err.response.data.error.message });
      });
  });
}

export function logOut(key, value) {
  if (key) {
    //if there is such a user signed in, log it out
    localStorage.clear();
  }
  console.log("log out: " + key + value);
}

export function checkExist(email) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}/exists`, {
        email: email
      })
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((err) => {
        reject({ status: false, message: err.response.data.error.message });
      });
  });
}

export function updatePassword(email, previous, current) {
  return new Promise((resolve, reject) => {
    axios
      .put(`${apiUrl}/password`, {
        email: email,
        previous: previous,
        current: current
      })
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((err) => {
        reject({ status: false, message: err.response.data.error.message });
      });
  });
}