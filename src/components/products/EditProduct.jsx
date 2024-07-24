import React, { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContextProvider";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { oneDish, getOneDish, ingredientsList, getIngredientsList, editDish } =
    useProduct();
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [type, setType] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [recipe, setRecipe] = useState("");
  const [level, setLevel] = useState("");
  const [quantPeople, setQuantPeople] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await getIngredientsList();
      await getOneDish(id);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (oneDish) {
      setName(oneDish.name || "");
      setCuisine(oneDish.cuisine || "");
      setType(oneDish.type || "");
      setCookingTime(oneDish.cooking_time || "");
      setRecipe(oneDish.recipe || "");
      setLevel(oneDish.level || "");
      setQuantPeople(oneDish.quant_people || "");
      setDescription(oneDish.description || "");
      setPhoto(oneDish.photo || "");
      setSelectedIngredients(
        oneDish.ingridients.map((ing) => ing.ingridient) || []
      );
      setQuantities(oneDish.ingridients.map((ing) => ing.quantity) || []);
    }
  }, [oneDish]);

  const handleUpdate = async () => {
    const updatedDish = {
      name,
      cuisine,
      type,
      cooking_time: parseInt(cookingTime),
      recipe,
      level,
      quant_people: parseInt(quantPeople),
      description,
      photo,
      ingridients: selectedIngredients.map((ingridient, index) => ({
        ingridient,
        quantity: quantities[index],
      })),
    };

    try {
      await editDish(id, updatedDish);
      setMessage("The dish has been successfully updated!");
      navigate("/productList");
    } catch (error) {
      setMessage("Error updating dish. Try again.");
      console.error("Error updating dish:", error);
    }
  };

  const addIngredient = () => {
    setSelectedIngredients([...selectedIngredients, ""]);
    setQuantities([...quantities, ""]);
  };

  const removeIngredient = (index) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
    setQuantities(quantities.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index, value) => {
    const updatedQuantities = quantities.map((quantity, i) =>
      i === index ? value : quantity
    );
    setQuantities(updatedQuantities);
  };

  return (
    <div className="edit-product-container">
      <h2>Editing a dish</h2>
      {message && <p>{message}</p>}
      <div>
        <label>Dish name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label>Cuisine:</label>
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="select-field"
        >
          <option value="">Choose a kitchen</option>
          <option value="Asian">Asian</option>
          <option value="Europian">Europian</option>
          <option value="Kyrgyz">Kyrgyz</option>
          <option value="Russian">Russian</option>
          <option value="Japanese">Japanese</option>
          <option value="Chinese">Chinese</option>
        </select>
      </div>
      <div>
        <label>Type of dish:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="select-field"
        >
          <option value="">Select dish type</option>
          <option value="Snack">Snack</option>
          <option value="First course">First course</option>
          <option value="Hot dish">Hot dish</option>
          <option value="Dessert">Dessert</option>
          <option value="Cocktail">Cocktail</option>
          <option value="Soup">Soup</option>
          <option value="Salad">Salad</option>
        </select>
      </div>
      <div>
        <label>Cooking time:</label>
        <input
          type="number"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label>Recipe:</label>
        <textarea
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
          className="textarea-field"
        />
      </div>
      <div>
        <label>Difficulty level:</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="select-field"
        >
          <option value="">Select difficulty level</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div>
        <label>Number of persons:</label>
        <input
          type="number"
          value={quantPeople}
          onChange={(e) => setQuantPeople(e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea-field"
        />
      </div>
      <div>
        <label>Photo:</label>
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          placeholder="Chooose photo"
          className="input-field"
        />
      </div>

      <div>
        <h3>Ingredients:</h3>
        {selectedIngredients.map((ingredient, index) => (
          <div key={index} className="ingredient-row">
            <select
              value={ingredient}
              onChange={(e) => {
                const selected = e.target.value ? parseInt(e.target.value) : "";
                setSelectedIngredients(
                  selectedIngredients.map((ing, i) =>
                    i === index ? selected : ing
                  )
                );
              }}
              className="select-field"
            >
              <option value="">Select ingredient</option>
              {ingredientsList.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={quantities[index] || ""}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              placeholder="Quantity"
            />
            <button onClick={() => removeIngredient(index)}>Delete</button>
          </div>
        ))}
        <button onClick={addIngredient}>Add ingredient</button>
      </div>

      <button onClick={handleUpdate}>Save changes</button>
    </div>
  );
};

export default EditProduct;
