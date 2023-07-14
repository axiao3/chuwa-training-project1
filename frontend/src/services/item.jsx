import axios from "axios";
const apiUrl = "http://localhost:8080";

export function getItemsList() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/item/get-list`)
      .then((response) => {
        //[{…}, {…}, {…}]
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
        reject(err.response.data.error.message);
      });
  });
}
