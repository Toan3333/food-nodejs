import axios from "axios";
console.log("ok");
async function createUser() {
  const response = await axios.post("http://localhost:3000/users/register");
}
