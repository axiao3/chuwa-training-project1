import axios from "axios";
const apiUrl = "http://localhost:8080";

export function getItemsList() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/item/get-list`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        //[{…}, {…}, {…}]
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
