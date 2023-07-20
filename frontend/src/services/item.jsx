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
  // console.log("token sending: ", localStorage.getItem("token"));
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
  user_id,
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
        {
          user_id,
          item_id,
          name,
          description,
          category,
          price,
          quantity,
          link,
        },
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

export function deleteItem(user_id, item_id) {
  // console.log("token sending: ", localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiUrl}/item/${item_id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: { user_id, item_id }, // Wrap data inside the 'data' property for delete method
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
