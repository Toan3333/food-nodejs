import axios from "axios";
console.log("ok");
const registerForm = document.querySelector("#registerForm");
async function createUser(newUser) {
  try {
    const response = await axios.post("http://localhost:3000/users/register", newUser);
    return response.data;
  } catch (error) {
    console.log("Lỗi thêm user mới", error);
    throw error; // Ném ra lỗi để xử lý ở nơi gọi
  }
}
registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userName = document.querySelector("#userName").value;
});
