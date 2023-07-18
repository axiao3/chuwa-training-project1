import axios from "axios";
const apiUrl = "http://localhost:8080";

export function getItemsList(sort, page) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/item/get-list/${sort}/${page}`, {
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
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/item/get-one/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function getItemsAmount() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/item/get-amount`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
