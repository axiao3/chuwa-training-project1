import axios from "axios";
const apiUrl = "http://localhost:8080";

export default function signUp(email, password, type) {
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
        alert(err.response.data.error.message);
        console.log(err.response.data.error.message);
        reject(err.response.data.error.message);
      });
  });
}
