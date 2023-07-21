import axios from "axios";
const apiUrl = "http://localhost:8080/item";

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
        `${apiUrl}`,
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
        `${apiUrl}`,
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
      .delete(`${apiUrl}/${item_id}`, {
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

export function getItemsList(sort, page, name) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/get-list/${sort}/${page}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          name: name
        }
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
      .get(`${apiUrl}/get-one/${id}`, {
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

export function getItemsAmount(keywords) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/get-amount`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          keywords: keywords
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
