import axios from "axios";
const productMain = document.querySelector(".product-detail__main");

function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

const getProductById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw new Error("Failed to fetch product");
  }
};

const renderProductDetail = async () => {
  try {
    const productId = getProductIdFromUrl();
    if (!productId) {
      throw new Error("Product ID is missing in URL");
    }

    const product = await getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

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
    console.error(error.message);
    // Xử lý lỗi một cách cụ thể tại đây, ví dụ hiển thị thông báo lỗi lên giao diện người dùng
  }
};

renderProductDetail();
