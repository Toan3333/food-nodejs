import axios from "axios";
const productMain = document.querySelector(".product-detail__main");

// Hàm lấy ID sản phẩm từ tham số URL
function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Hàm lấy thông tin sản phẩm từ server
const getProductById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/products/_${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch product");
  }
};

// Lấy ID sản phẩm từ URL
const productId = getProductIdFromUrl();
async function renderProductDetail() {
  try {
    if (!productId) {
      throw new Error("Product ID is missing in URL");
    }
    // Lấy thông tin sản phẩm từ server
    const product = await getProductById(productId);

    const template = `<div class="product-detail__image">
    <img src="${product.image}" alt="" />
  </div>
  <div class="product-detail__content">
    <div class="product-detail__heading">Best seller</div>
    <h3 class="product-detail__title">${product.name}</h3>
    <div class="product-detail__price">$ ${product.price}</div>
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
      ${product.description}
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
    console.log(error.message);
  }
}

// Gọi hàm renderProductDetail để hiển thị chi tiết sản phẩm
renderProductDetail();
