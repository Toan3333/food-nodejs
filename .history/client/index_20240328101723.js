const specialList = document.querySelector(".<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>")
const getAll = async () => {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  console.log(data);
};
getAll();
