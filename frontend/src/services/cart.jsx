import axios from "axios";
const apiUrl = "http://localhost:8080";

export function AddToCart(userId, itemId, quantity) {
  const itemData = { user: userId, item: itemId, quantity: quantity };
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}/cart/add`, itemData)
      .then((response) => {
        console.log("add:", response.data);
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
        reject(err.response.data.error.message);
      });
  });
}

export function RemoveFromCart(itemId) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiUrl}/cart`, {
        params: {
          itemId: itemId,
        },
      })
      .then((response) => {
        console.log("delete:", response.data);
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
        reject(err.response.data.error.message);
      });
  });
}

export function getCart(userId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/cart/get_all/${userId}`)
      .then((response) => {
        console.log("get-cart:", response.data);
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
        reject(err.response.data.error.message);
      });
  });
}

export function getItemQuantityInCart(userId, itemId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/cart/get_one/${userId}/${itemId}`)
      .then((response) => {
        response.data ? resolve(response.data.quantity) : resolve(0);
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
        reject(err.response.data.error.message);
      });
  });
}
