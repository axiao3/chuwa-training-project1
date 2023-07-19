import axios from "axios";
const apiUrl = "http://localhost:8080";

export function createItem(
  user_id,
  name,
  description,
  category,
  price,
  quantity,
  link
) {
  console.log("token sending: ", localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${apiUrl}/item`,
        { user_id, name, description, category, price, quantity, link },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
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

export function editItem(
  item_id,
  name,
  description,
  category,
  price,
  quantity,
  link
) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${apiUrl}/item`,
        { item_id, name, description, category, price, quantity, link },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
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
