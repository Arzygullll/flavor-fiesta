import { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContextProvider";

const AddProduct = () => {
  const { categories, getCategories, addProduct } = useProduct();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getCategories();
  }, []);
  console.log(categories);
  const handleClick = () => {
    const newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("description", description);
    newProduct.append("price", price);
    newProduct.append("image", image);
    newProduct.append("category", category);
    addProduct(newProduct);
  };
  return (
    <div>
      <h1>Add Product</h1>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="title"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="description"
      />
      <input
        onChange={(e) => setPrice(e.target.value)}
        type="text"
        placeholder="price"
      />
      <input
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        placeholder="image"
      />
      <select onChange={(e) => setCategory(e.target.value)} id="">
        <option value="">Choose category</option>
        {categories.map((elem) => (
          <option value={elem.id} key={elem.id}>
            {elem.title}
          </option>
        ))}
        ;
      </select>
      <button onClick={handleClick}>Add Product</button>
    </div>
  );
};

export default AddProduct;
