import axios from "axios";
const productMain = document.querySelector(".product-detail__main");
const foodList = document.querySelector(".food-list");
// Hàm lấy ID sản phẩm từ tham số URL
function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Lấy ID sản phẩm từ URL

const productId = getProductIdFromUrl();
async function getProductById(id) {
  try {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    const product = response.data;
    console.log(product); // Trích xuất thông tin sản phẩm từ response.data
    renderProductDetail(product);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch product");
  }
}

// Gọi hàm getProductById sau khi có productId
getProductById(productId);

async function renderProductDetail(item) {
  try {
    const template = `<div class="product-detail__image">
      <img src="http://localhost:3000/images/${item.image}" alt="" />
    </div>
    <div class="product-detail__content">
      <div class="product-detail__heading">Best seller</div>
      <h3 class="product-detail__title">${item.name}</h3>
      <div class="product-detail__price">$ ${item.price}</div>
      <div class="product-detail__review">
        <div class="product-detail__list">
          <div class="product-detail__rating">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
          </div>
          <div class="product-detail__view">214 Reviews</div>
        </div>
        <div class="product-detail__viewall">View all</div>
      </div>
      <div class="product-detail__text">Description:</div>
      <p class="product-detail__desc">
        Yangnyeom chicken (Korean: 양념치킨) is a variety of Korean fried chicken seasoned
        with a sweet and spicy sauce of gochujang, garlic, sugar, and other spices. It is
        often eaten as anju, food consumed while drinking, in South Korea.
      </p>
      <div class="product-detail__container">
        <div class="product-detail__quantity">
          <input type="text" value="1" min="1" max="10" />
          <div class="product-detail__item">
            <i class="fa fa-minus" aria-hidden="true"></i>
            <i class="fa fa-plus" aria-hidden="true"></i>
          </div>
        </div>
        <div class="product-detail__btn">
          <button class="button-primary">ORDER NOW</button>
        </div>
      </div>
    </div>`;
    productMain.insertAdjacentHTML("beforeend", template);
  } catch (error) {
    console.log(error);
  }
}

async function getRedatedProductData() {
  try {
  } catch (error) {
    console.log("Không lấy được sản phẩm liên quan", error);
  }
}

function showRelatedProduct(item) {
  const tempale = `<div class="food-item">
  <div class="food-image">
    <img src="http://localhost:3000/images/${item.image}" alt="" />
  </div>
  <div class="food-body">
    <div class="food-name">${item.name}</div>
    <div class="food-price">$ ${item.price}</div>
  </div>
</div>`;
  foodList.insertAdjacentHTML("beforeend", tempale);
}
