import { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContextProvider";

const AddProduct = () => {
  const [ingridients, setIngridients] = useState("");
  console.log(ingridients);
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [type, setType] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [photo, setPhoto] = useState("");
  const [recipe, setRecipe] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");

  const { addProduct } = useProduct();

  const handleClick = () => {
    const newProduct = new FormData();
    newProduct.append("ingridients", ingridients);
    newProduct.append("owner", owner);
    newProduct.append("name", name);
    newProduct.append("cuisine", cuisine);
    newProduct.append("type", type);
    newProduct.append("cooking_time", cookingTime);
    newProduct.append("photo", photo);
    newProduct.append("recipe", recipe);
    newProduct.append("level", level);
    newProduct.append("description", description);
    addProduct(newProduct);
  };
  return (
    <div style={{ marginTop: "80px" }}>
      <h1>Add Product</h1>
      <input
        onChange={(e) => setIngridients(e.target.value)}
        type="text"
        placeholder="ingridients"
      />
      <input
        onChange={(e) => setOwner(e.target.value)}
        type="text"
        placeholder="owner"
      />
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="name"
      />
      <input
        onChange={(e) => setCuisine(e.target.value)}
        type="text"
        placeholder="cuisine"
      />
      <input
        onChange={(e) => setType(e.target.value)}
        type="text"
        placeholder="type"
      />
      <input
        onChange={(e) => setCookingTime(e.target.value)}
        type="number"
        placeholder="cooking_time"
      />
      <input
        onChange={(e) => setPhoto(e.target.files[0])}
        type="file"
        placeholder="photo"
      />
      <input
        onChange={(e) => setRecipe(e.target.value)}
        type="text"
        placeholder="recipe"
      />
      <input
        onChange={(e) => setLevel(e.target.value)}
        type="text"
        placeholder="level"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="description"
      />

      <button onClick={handleClick}>Add Product</button>
    </div>
  );
};

export default AddProduct;
