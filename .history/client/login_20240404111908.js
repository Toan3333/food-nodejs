import axios from "axios";
console.log("ok");
const formLogin = document.querySelector("#form-login");
async function getUser() {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
}
formLogin.addEventListener("submit", async function (e) {
  e.preventDefault;
});
