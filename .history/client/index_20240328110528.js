import axios from "axios";
const specialList = document.querySelector(".special-list");

function showProduct(item) {
  const template = `<div class="special-item">
  <div class="special-image">
    <a href="/product-detail/{{this.id}}">
      <img src="http://localhost:1234/client/public/images/${item.image}" alt="" />
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
getAll();
