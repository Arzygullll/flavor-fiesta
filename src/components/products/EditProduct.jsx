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
      ingridients: selectedIngredients.map((ingridient, index) => ({
        ingridient,
        quantity: quantities[index],
      })),
    };

    try {
      await editDish(id, updatedDish);
      setMessage("Блюдо успешно обновлено!");
      navigate("/productList");
    } catch (error) {
      setMessage("Ошибка при обновлении блюда. Попробуйте снова.");
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
      <h2>Редактирование блюда</h2>
      {message && <p>{message}</p>}
      <div>
        <label>Название блюда:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label>Кухня:</label>
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="select-field"
        >
          <option value="">Выберите кухню</option>
          <option value="Asian">Азиатская</option>
          <option value="European">Европейская</option>
          <option value="Kyrgyz">Киргизская</option>
          <option value="Russian">Русская</option>
          <option value="Japanese">Японская</option>
          <option value="Chinese">Китайская</option>
        </select>
      </div>
      <div>
        <label>Тип блюда:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="select-field"
        >
          <option value="">Выберите тип блюда</option>
          <option value="Snack">Закуска</option>
          <option value="First course">Первое блюдо</option>
          <option value="Hot dish">Горячее блюдо</option>
          <option value="Dessert">Десерт</option>
          <option value="Cocktail">Коктейль</option>
          <option value="Soup">Суп</option>
          <option value="Salad">Салат</option>
        </select>
      </div>
      <div>
        <label>Время приготовления:</label>
        <input
          type="number"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label>Рецепт:</label>
        <textarea
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
          className="textarea-field"
        />
      </div>
      <div>
        <label>Уровень сложности:</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="select-field"
        >
          <option value="">Выберите уровень сложности</option>
          <option value="Easy">Легкий</option>
          <option value="Medium">Средний</option>
          <option value="Hard">Сложный</option>
        </select>
      </div>
      <div>
        <label>Количество человек:</label>
        <input
          type="number"
          value={quantPeople}
          onChange={(e) => setQuantPeople(e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label>Описание:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea-field"
        />
      </div>

      <div>
        <h3>Ингредиенты:</h3>
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
              <option value="">Выберите ингредиент</option>
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
              placeholder="Количество"
            />
            <button onClick={() => removeIngredient(index)}>Удалить</button>
          </div>
        ))}
        <button onClick={addIngredient}>Добавить ингредиент</button>
      </div>

      <button onClick={handleUpdate}>Сохранить изменения</button>
    </div>
  );
};

export default EditProduct;
