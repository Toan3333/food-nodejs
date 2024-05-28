import axios from "axios";
import { Buffer } from "buffer";
const specialList = document.querySelector(".special-list");
const productHot = document.querySelector("#productHot");
const searchBtn = document.querySelector("#search-btn");
let searchForm = document.querySelector(".search-form");
searchBtn.addEventListener("click", function (e) {
  searchForm.classList.toggle("active");
});
function showProduct(item) {
  const template = `<div class="special-item">
  <div class="special-image">
    <a href="./public/pages/product-detail.html?id=${item._id}">
      <img src="http://localhost:3000/images/${item.image}" alt="" />
    </a>
    <i class="fa fa-heart" aria-hidden="true"></i>
    <i class="fa fa-eye" aria-hidden="true"></i>
  </div>
  <div class="special-title">${item.name}</div>
  <div class="special-rating">
    <div class="special-icon">
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
    </div>
    <div class="special-views">214 Reviews</div>
  </div>
  <div class="special-bottom">
    <div class="special-price">$ ${item.price}</div>
    <div class="special-button">
      <button class="button-primary" id="orderBtn">
        ORDER NOW
      </button>
    </div>
  </div>
</div>`;
  specialList.insertAdjacentHTML("beforeend", template);
}
function showProductHot(item) {
  const template = `<div class="special-item">
  <div class="special-image">
    <a href="./public/pages/product-detail.html?id=${item._id}">
      <img src="http://localhost:3000/images/${item.image}" alt="" />
    </a>
    <i class="fa fa-heart" aria-hidden="true"></i>
    <i class="fa fa-eye" aria-hidden="true"></i>
  </div>
  <div class="special-title">${item.name}</div>
  <div class="special-rating">
    <div class="special-icon">
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
      <i class="fa fa-star" aria-hidden="true"></i>
    </div>
    <div class="special-views">214 Reviews</div>
  </div>
  <div class="special-bottom">
    <div class="special-price">$ ${item.price}</div>
    <div class="special-button">
      <button class="button-primary" id="orderBtn">
        ORDER NOW
      </button>
    </div>
  </div>
</div>`;
  productHot.insertAdjacentHTML("beforeend", template);
}
const getAll = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    const data = response.data.Products;
    console.log(data);
    data.forEach((item) => {
      showProduct(item);
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductHot = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products/hot");
    const data = response.data.products;
    console.log("Sản phẩm hot", data);
    data.forEach((item) => {
      showProductHot(item);
    });
  } catch (error) {
    console.log(error);
  }
};
getProductHot();
getAll();
