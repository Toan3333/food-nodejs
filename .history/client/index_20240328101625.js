const getAll = async () => {
  const response = await fetch("http://localhost:3000/products");
  return response.data;
};
getAll();
