import React, { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContextProvider";
import "./AddProduct.css";

const AddProduct = () => {
  const { addDish, getIngredientsList, uploadDishImage } = useProduct();
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [type, setType] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [recipe, setRecipe] = useState("");
  const [level, setLevel] = useState("");
  const [quantPeople, setQuantPeople] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getIngredientsList();
        console.log("Fetched ingredients:", data); // Проверка полученных данных
        setIngredients(data || []);
      } catch (error) {
        console.error("Error fetching ingredients:", error); // Ловим ошибки получения данных
      }
    };

    fetchIngredients();
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !name ||
      !cuisine ||
      !type ||
      !cookingTime ||
      !recipe ||
      !level ||
      !quantPeople ||
      !description ||
      !photo ||
      selectedIngredients.length === 0 ||
      selectedIngredients.some((ingredient) => ingredient === "") ||
      quantities.some((quantity) => !quantity)
    ) {
      setMessage("Пожалуйста, заполните все поля.");
      return;
    }

    const newDish = {
      name,
      cuisine: cuisine.trim(),
      type,
      cooking_time: parseInt(cookingTime),
      recipe,
      level,
      quant_people: parseInt(quantPeople),
      description,
      ingridients: selectedIngredients.map((ingredient, index) => ({
        ingridient: parseInt(ingredient),
        quantity: parseInt(quantities[index]),
      })),
    };

    console.log("New dish object:", newDish);

    try {
      const dishModel = await addDish(newDish);
      if (dishModel && photo) {
        await uploadDishImage(dishModel.id, photo);
      }
      setMessage("Блюдо успешно добавлено!");
      setName("");
      setCuisine("");
      setType("");
      setCookingTime("");
      setRecipe("");
      setLevel("");
      setQuantPeople("");
      setDescription("");
      setPhoto(null);
      setSelectedIngredients([]);
      setQuantities([]);
    } catch (error) {
      setMessage("Ошибка при добавлении блюда. Попробуйте снова.");
      console.error("Error adding dish:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Добавление блюда</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <option value="Europian">Европейская</option>
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
          <label>Фото:</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="input-field"
          />
        </div>

        <div>
          <h3>Ингредиенты:</h3>
          {selectedIngredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <select
                value={ingredient || ""}
                onChange={(e) => {
                  const selected = e.target.value
                    ? parseInt(e.target.value)
                    : "";
                  setSelectedIngredients(
                    selectedIngredients.map((ing, i) =>
                      i === index ? selected : ing
                    )
                  );
                }}
                className="select-field"
              >
                <option value="">Выберите ингредиент</option>
                {ingredients.map((ing) => (
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
              <button type="button" onClick={() => removeIngredient(index)}>
                Удалить
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            Добавить ингредиент
          </button>
        </div>

        <button type="submit">Добавить блюдо</button>
      </form>
    </div>
  );
};

export default AddProduct;
