import axios from "axios";
const apiUrl = "http://localhost:8080";

export function cartIncrement(itemId, quantity) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${apiUrl}/cart/add`,
        { itemId: itemId, quantity: quantity },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function cartDecrement(itemId, quantity) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiUrl}/cart/${itemId}/${quantity}`, {
        headers: { Authorization: localStorage.getItem("token") },
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

export function getCart() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/cart/get-all`, {
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
