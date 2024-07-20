import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContextProvider";
import "./ProductCard.css"; // Импортируем CSS-файл для стилей карточек

const ProductCard = ({ elem }) => {
  const { deleteDish } = useProduct();
  const navigate = useNavigate();

  return (
    <div className="dish-card">
      <div className="dish-info">
        <h3 className="dish-title">{elem.name}</h3>
        <p className="dish-description">Description: {elem.description}</p>
        <p>Cuisine: {elem.cuisine}</p>
        <p>Type: {elem.type}</p>
        <p>Cooking Time: {elem.cooking_time} min</p>
        <p>Level: {elem.level}</p>
        <p>Owner: {elem.owner}</p>
        <p>
          Ingredients:{" "}
          {elem.ingredients &&
            elem.ingredients.length > 0 &&
            elem.ingredients[0].name}
        </p>
        <p className="dish-recipe">Recipe: {elem.recipe}</p>
        <div className="dish-buttons">
          <button className="delete-button" onClick={() => deleteDish(elem.id)}>
            Delete
          </button>
          <button
            className="edit-button"
            onClick={() => navigate(`/edit/${elem.id}`)}
          >
            Edit
          </button>
        </div>
      </div>
      <img className="dish-image" src={elem.photo} alt={elem.name} />
    </div>
  );
};

export default ProductCard;
