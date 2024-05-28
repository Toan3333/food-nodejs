import axios from "axios";
console.log("ok");
async function createUser(newUser) {
  const response = await axios.post("http://localhost:3000/users/register", newUser);
  return response.data;
}
