import axios from "axios";
const apiUrl = "http://localhost:8080";

export function createItem(user_id, name, description, category, price, quantity, link) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}/item`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: {
          user_id, name, description, category, price, quantity, link
        }
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

export function editItem(user_id, name, description, category, price, quantity, link) {
  return new Promise((resolve, reject) => {
    axios
      .put(`${apiUrl}/item`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: {
          user_id, name, description, category, price, quantity, link
        }
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
