import axios from "axios";
console.log("ok");
async function getUser() {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
}
