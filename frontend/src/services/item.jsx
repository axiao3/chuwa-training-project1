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

// getOneItem
export function getOneItem(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/item/get-one/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        resolve(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
