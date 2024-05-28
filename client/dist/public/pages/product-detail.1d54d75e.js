var a=globalThis,i={},e={},t=a.parcelRequiree8ef;null==t&&((t=function(a){if(a in i)return i[a].exports;if(a in e){var t=e[a];delete e[a];var s={id:a,exports:{}};return i[a]=s,t.call(s.exports,s,s.exports),s.exports}var d=Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(a,i){e[a]=i},a.parcelRequiree8ef=t),t.register;var s=t("fmRoT");const d=document.querySelector(".product-detail__main"),r=document.querySelector(".food-list"),c=new URLSearchParams(window.location.search).get("id");async function l(a){try{let i=`<div class="product-detail__image">
      <img src="http://localhost:3000/images/${a.image}" alt="" />
    </div>
    <div class="product-detail__content">
      <div class="product-detail__heading">Best seller</div>
      <h3 class="product-detail__title">${a.name}</h3>
      <div class="product-detail__price">$ ${a.price}</div>
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
        Yangnyeom chicken (Korean: \u{C591}\u{B150}\u{CE58}\u{D0A8}) is a variety of Korean fried chicken seasoned
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
    </div>`;d.insertAdjacentHTML("beforeend",i)}catch(a){console.log(a)}}(async function(a){try{let i=(await (0,s.default).get(`http://localhost:3000/products/${a}`)).data;console.log(i),l(i)}catch(a){throw console.log(a),Error("Failed to fetch product")}})(c),async function(a){try{let i=(await (0,s.default).get(`http://localhost:3000/products/related/${a}`)).data.RelatedProducts;console.log(i),i.forEach(a=>{(function(a){let i=`<div class="special-item">
  <div class="special-image">
    <a href="./product-detail.html?id=${a._id}">
      <img src="http://localhost:3000/images/${a.image}" alt="" />
    </a>
    <i class="fa fa-heart" aria-hidden="true"></i>
    <i class="fa fa-eye" aria-hidden="true"></i>
  </div>
  <div class="special-title">${a.name}</div>
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
    <div class="special-price">$ ${a.price}</div>
    <div class="special-button">
      <button class="button-primary" id="orderBtn">
        ORDER NOW
      </button>
    </div>
  </div>
</div>`;r.insertAdjacentHTML("beforeend",i)})(a)})}catch(a){console.log("Không lấy được sản phẩm liên quan",a)}}(c);
//# sourceMappingURL=product-detail.1d54d75e.js.map
