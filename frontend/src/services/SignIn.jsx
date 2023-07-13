import axios from "axios";
const apiUrl = "http://localhost:8080";


export default function SignIn (email, password) {
    console.log("Sign in services SignIn");
    return new Promise ((resolve, reject) => {
        axios
            .post(`${apiUrl}/signin`, {
                email: email,
                password: password
            })
            .then((response) => {
                console.log(response.data);
                alert("Signed in successfully!");
                resolve({
                    status: true,
                    message: `sign in successfully! Relocate to Product list page...`,
                    email: email,
                    token: response.data.token,
                });
            })
            .catch((err) => {
                alert("Wrong email /password.");
                console.log(err.response.data.error.message);
                reject(err.response.data.error.message);
            });
    })
}