import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContextProvider";

const ProductCard = ({ elem }) => {
  const { deleteProduct } = useProduct();
  const navigate = useNavigate();
  console.log();

  return (
    <div>
      <h3>{elem.name}</h3>
      <p>Description: {elem.description}</p>
      <p>Cuisine: {elem.cuisine}</p>
      <p>Type: {elem.type}</p>
      <p>Cooking Time: {elem.cooking_time}</p>
      <p>Level: {elem.level}</p>
      <p>Owner: {elem.owner}</p>
      <p>
        Ingredients:
        {/* {typeof elem.ingridients === "string"
          ? elem.ingridients
          : JSON.stringify(elem.ingridients)} */}
        {elem.ingridients[0] && elem.ingridients[0].name}
      </p>
      <img width={150} src={elem.photo} alt={elem.name} />
      <p>Recipe: {elem.recipe}</p>

      <button onClick={() => deleteProduct(elem.id)}>Delete</button>
      <button onClick={() => navigate(`/edit/${elem.id}`)}>Edit</button>
    </div>
  );
};

export default ProductCard;
