// const productApi = "http://localhost:3000/products";
// const productTable = document.querySelector("#showsp");
const addProBtn = document.querySelector(".add-product");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");
const modalCloseUpdate = document.querySelector("#modalClose");

addProBtn.addEventListener("click", showModal);
function showModal() {
  modal.classList.add("active");
}
modalClose.addEventListener("click", closeModal);
function closeModal() {
  modal.classList.remove("active");
}
modalCloseUpdate.addEventListener("click", closeModalUpdate);
function closeModalUpdate() {
  const modal = document.querySelector("#modalUpdate");
  modal.classList.remove("active");
}
function showEditForm() {
  const modalEdit = document.querySelector("#modalUpdate");
  modalEdit.classList.add("active");
}
// function showProductAdmin(item) {
//   const kq = `<tr>
//                   <td>${item.id}</td>
//                   <td>${item.name}</td>
//                   <td class="admin-img"><img src="${item.image}" alt="" /></td>
//                   <td>$ ${item.price}</td>
//                   <td>${item.category}</td>
//                   <td>
//                   <div class="edit-auth">
//                       <a href="#" class="edit-btn" id="editButton">Edit</a>
//                           <a href="#" class="delete-btn" data-id="${item.id}">Delete</a>
//                       </div>
//                   </td>
//               </tr>`;
//   productTable.insertAdjacentHTML("beforeend", kq);
// }

// function showEditForm() {
//   const modal = document.querySelector("#modalUpdate");
//   modal.classList.add("active");
// }
// function closeEditForm() {
//   const modal = document.querySelector("#modalUpdate");
//   modal.classList.remove("active");
// }
// async function deleteProduct(productId) {
//   const numberRic = Number(productId);
//   await fetch(`${productApi}/${numberRic}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": null,
//     },
//   });
// }
// thêm sản phẩm
// async function CreateNewProduct(name, image, category, price) {
//   await fetch(productApi, {
//     method: "POST",
//     body: JSON.stringify({
//       name,
//       image,
//       category,
//       price,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
// }
// Sửa sản phẩm
// async function updateProduct(name, image, category, price) {
//   await fetch(productApi, {
//     method: "PUT",
//     body: JSON.stringify({
//       name,
//       image,
//       category,
//       price,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
// }

// async function getproductAdmin() {
//   const response = await fetch(productApi);
//   const data = await response.json();
//   console.log(data);
//   data.forEach((item) => {
//     showProductAdmin(item);
//   });

//   const deleteBtn = document.querySelectorAll(".delete-btn");
//   deleteBtn.forEach((button) => {
//     button.addEventListener("click", () => {
//       const productId = button.getAttribute("data-id");
//       deleteProduct(productId);
//     });
//   });
// }

// const adminFormPost = document.querySelector(".admin-form");
// adminFormPost.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const nameElement = document.getElementById("name");
//   const imageElement = document.getElementById("img");
//   const categoryElement = document.getElementById("category");
//   const priceElement = document.getElementById("price");

//   // Kiểm tra xem các phần tử có tồn tại không
//   if (nameElement && imageElement && categoryElement && priceElement) {
//     const name = nameElement.value;
//     const img = imageElement.value;
//     const category = categoryElement.value;
//     const price = priceElement.value;

//     // Tiếp tục xử lý dữ liệu
//     CreateNewProduct(name, img, category, price);
//   } else {
//     console.error("One or more input elements not found.");
//   }
// });
// productTable.addEventListener("click", function (e) {
//   if (e.target.matches(".edit-btn")) {
//     showEditForm();
//   }
// });
// const formUpdate = document.querySelector("#formEdit");
// formUpdate.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const nameElement = document.getElementById("nameUpdate");
//   const imageElement = document.getElementById("imageUpdate");
//   const categoryElement = document.getElementById("categoryUpdate");
//   const priceElement = document.getElementById("priceUpdate");

//   // Kiểm tra xem các phần tử có tồn tại không
//   if (nameElement && imageElement && categoryElement && priceElement) {
//     const name = nameElement.value;
//     const img = imageElement.value;
//     const category = categoryElement.value;
//     const price = priceElement.value;

//     // Tiếp tục xử lý dữ liệu
//     updateProduct(name, img, category, price);
//     closeModalUpdate(); // Đóng modal sau khi cập nhật
//   } else {
//     console.error("One or more input elements not found.");
//   }
// });
// getproductAdmin();
