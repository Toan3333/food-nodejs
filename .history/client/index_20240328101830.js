const specialList = document.querySelector(".special-list");

function showProduct(item) {
  const template = `<div class="special-item">
  <div class="special-image">
    <a href="/product-detail/{{this.id}}">
      <img src="./public/images/special-1.png" alt="" />
    </a>
    <i class="fa fa-heart" aria-hidden="true"></i>
    <i class="fa fa-eye" aria-hidden="true"></i>
  </div>
  <div class="special-title">{{this.name}}</div>
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
    <div class="special-price">$ {{this.price}}</div>
    <div class="special-button">
      <button class="button-primary" id="orderBtn" data-id="${product.id}">
        ORDER NOW
      </button>
    </div>
  </div>
</div>`;
  specialList.insertAdjacentHTML("beforeend", template);
}
const getAll = async () => {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  console.log(data);
};
getAll();
