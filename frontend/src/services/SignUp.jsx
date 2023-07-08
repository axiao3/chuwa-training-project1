import axios from "axios";

export default function signUp(email, password) {
  axios
    .post("/api/signup", { email: email, password: password })
    .then((response) => {}).catch();
}
