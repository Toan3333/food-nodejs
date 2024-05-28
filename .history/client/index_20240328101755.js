const specialList = document.querySelector(".special-list");

function showProduct(item) {
  const template = ``;
}
const getAll = async () => {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  console.log(data);
};
getAll();
