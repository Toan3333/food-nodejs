var a=globalThis,i={},e={},t=a.parcelRequiree8ef;null==t&&((t=function(a){if(a in i)return i[a].exports;if(a in e){var t=e[a];delete e[a];var s={id:a,exports:{}};return i[a]=s,t.call(s.exports,s,s.exports),s.exports}var r=Error("Cannot find module '"+a+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(a,i){e[a]=i},a.parcelRequiree8ef=t),t.register;var s=t("fmRoT");t("6ZWSX");const r=document.querySelector(".special-list"),c=document.querySelector("#productHot"),l=document.querySelector("#search-btn");let d=document.querySelector(".search-form");l.addEventListener("click",function(a){d.classList.toggle("active")});const o=async()=>{try{let a=(await (0,s.default).get("http://localhost:3000/products/special")).data.Products;console.log(a),a.forEach(a=>{!function(a){let i=`<div class="special-item">
  <div class="special-image">
    <a href="./public/pages/product-detail.html?id=${a._id}">
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
</div>`;r.insertAdjacentHTML("beforeend",i)}(a)})}catch(a){console.log(a)}};(async()=>{try{let a=localStorage.getItem("token"),i=(await (0,s.default).get("http://localhost:3000/products/hot",{headers:{Authorization:`Bearer ${a}`}})).data.products;console.log("Sản phẩm hot",i),i.forEach(a=>{!function(a){let i=`<div class="special-item">
  <div class="special-image">
    <a href="./public/pages/product-detail.html?id=${a._id}">
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
</div>`;c.insertAdjacentHTML("beforeend",i)}(a)})}catch(a){console.log(a)}})(),o();
//# sourceMappingURL=index.344401b6.js.map
