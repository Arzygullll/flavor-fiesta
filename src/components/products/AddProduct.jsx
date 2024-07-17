// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AddProduct.css";

// const AddProduct = () => {
//   const [ingredients, setIngredients] = useState([]);
//   const [selectedIngredients, setSelectedIngredients] = useState([]);
//   const [quantities, setQuantities] = useState([]);
//   const [productName, setProductName] = useState("");
//   const [cuisine, setCuisine] = useState("");
//   const [type, setType] = useState("");
//   const [cookingTime, setCookingTime] = useState("");
//   const [recipe, setRecipe] = useState("");
//   const [level, setLevel] = useState("");
//   const [quantPeople, setQuantPeople] = useState("");
//   const [description, setDescription] = useState("");

//   // Получение списка ингредиентов из API
//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         const response = await axios.get(
//           "http://16.171.0.70/api/ingridients/get/"
//         );
//         setIngredients(response.data);
//       } catch (error) {
//         console.error("Ошибка при получении ингредиентов:", error);
//       }
//     };
//     fetchIngredients();
//   }, []);

//   // Обработчик для добавления нового ингредиента
//   const addIngredient = () => {
//     setSelectedIngredients([...selectedIngredients, null]);
//     setQuantities([...quantities, ""]);
//   };

//   // Обработчик для удаления ингредиента
//   const removeIngredient = (index) => {
//     setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
//     setQuantities(quantities.filter((_, i) => i !== index));
//   };

//   // Обработчик для изменения количества ингредиента
//   const handleQuantityChange = (index, value) => {
//     const newQuantities = [...quantities];
//     newQuantities[index] = value;
//     setQuantities(newQuantities);
//   };

//   // Функция для получения токена аутентификации
//   const getAuthToken = () => {
//     return localStorage.getItem("authToken"); // Пример хранения токена в localStorage
//   };

//   // Обработчик для отправки данных формы
//   const handleSubmit = async () => {
//     const token = getAuthToken();
//     if (!token) {
//       console.error("Пользователь не аутентифицирован");
//       return;
//     }

//     try {
//       const payload = {
//         ingridients: selectedIngredients.map((ingredient, index) => ({
//           ingridient: ingredient,
//           quantity: quantities[index],
//         })),
//         name: productName,
//         cuisine,
//         type,
//         cooking_time: parseInt(cookingTime),
//         recipe,
//         level,
//         quant_people: parseInt(quantPeople),
//         description,
//       };

//       const response = await axios.post(
//         "http://16.171.0.70/api/dish/",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Добавляем заголовок аутентификации
//           },
//         }
//       );

//       console.log("Продукт успешно добавлен:", response.data);
//       // Здесь можно добавить обновление интерфейса или перенаправление на другую страницу
//     } catch (error) {
//       console.error("Ошибка при добавлении продукта:", error);
//     }
//   };

//   return (
//     <div style={{ marginTop: "80px" }}>
//       <h2>Добавление продукта</h2>
//       <div>
//         <label>Название продукта:</label>
//         <input
//           type="text"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Кухня:</label>
//         <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
//           <option value="">Выберите кухню</option>
//           <option value="Asian">Азиатская</option>
//           <option value="Europian">Европейская</option>
//           <option value="Kyrgyz">Киргизская</option>
//           <option value="Russian">Русская</option>
//           <option value="Japan">Японская</option>
//           <option value="Chinese">Китайская</option>
//         </select>
//       </div>
//       <div>
//         <label>Тип продукта:</label>
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="">Выберите тип продукта</option>
//           <option value="Snack">Закуска</option>
//           <option value="First course">Первое блюдо</option>
//           <option value="Hot dish">Горячее блюдо</option>
//           <option value="Dessert">Десерт</option>
//           <option value="Cocktail">Коктейль</option>
//           <option value="Soup">Суп</option>
//           <option value="Salad">Салат</option>
//         </select>
//       </div>
//       <div>
//         <label>Время приготовления:</label>
//         <input
//           type="number"
//           value={cookingTime}
//           onChange={(e) => setCookingTime(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Рецепт:</label>
//         <textarea value={recipe} onChange={(e) => setRecipe(e.target.value)} />
//       </div>
//       <div>
//         <label>Уровень сложности:</label>
//         <select value={level} onChange={(e) => setLevel(e.target.value)}>
//           <option value="">Выберите уровень сложности</option>
//           <option value="Easy">Простой</option>
//           <option value="Medium">Средний</option>
//           <option value="Hard">Сложный</option>
//         </select>
//       </div>
//       <div>
//         <label>Количество человек:</label>
//         <input
//           type="number"
//           value={quantPeople}
//           onChange={(e) => setQuantPeople(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Описание:</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>
//       {selectedIngredients.map((_, index) => (
//         <div key={index}>
//           <select
//             value={selectedIngredients[index] || ""}
//             onChange={(e) => {
//               const selected =
//                 e.target.value !== "" ? parseInt(e.target.value) : null;
//               setSelectedIngredients(
//                 selectedIngredients.map((ing, i) =>
//                   i === index ? selected : ing
//                 )
//               );
//             }}
//           >
//             <option value="">Выберите ингредиент</option>
//             {ingredients.map((ing) => (
//               <option key={ing.id} value={ing.id}>
//                 {ing.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="number"
//             value={quantities[index] || ""}
//             onChange={(e) => handleQuantityChange(index, e.target.value)}
//             placeholder="Количество"
//           />
//           <button type="button" onClick={() => removeIngredient(index)}>
//             Удалить
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={addIngredient}>
//         Добавить ингредиент
//       </button>
//       <button type="button" onClick={handleSubmit}>
//         Отправить
//       </button>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [productName, setProductName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [type, setType] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [recipe, setRecipe] = useState("");
  const [level, setLevel] = useState("");
  const [quantPeople, setQuantPeople] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Получение списка ингредиентов из API
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "http://16.171.0.70/api/ingridients/get/"
        );
        setIngredients(response.data);
      } catch (error) {
        console.error("Ошибка при получении ингредиентов:", error);
      }
    };
    fetchIngredients();
  }, []);

  // Обработчик для добавления нового ингредиента
  const addIngredient = () => {
    setSelectedIngredients([...selectedIngredients, null]);
    setQuantities([...quantities, ""]);
  };

  // Обработчик для удаления ингредиента
  const removeIngredient = (index) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
    setQuantities(quantities.filter((_, i) => i !== index));
  };

  // Обработчик для изменения количества ингредиента
  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  // Функция для получения токена аутентификации
  const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Пример хранения токена в localStorage
  };

  // Обработчик для отправки данных формы
  const handleSubmit = async () => {
    const token = getAuthToken();
    if (!token) {
      console.error("Пользователь не аутентифицирован");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ingredients: selectedIngredients.map((ingredient, index) => ({
          ingredient: ingredient,
          quantity: quantities[index],
        })),
        name: productName,
        cuisine,
        type,
        cooking_time: parseInt(cookingTime),
        recipe,
        level,
        quant_people: parseInt(quantPeople),
        description,
      };

      const response = await axios.post(
        "http://16.171.0.70/api/dish/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Добавляем заголовок аутентификации
          },
        }
      );

      console.log("Продукт успешно добавлен:", response.data);
      // Здесь можно добавить обновление интерфейса или перенаправление на другую страницу
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Добавление продукта</h2>
      <div>
        <label>Название продукта:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <label>Кухня:</label>
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">Выберите кухню</option>
          <option value="Asian">Азиатская</option>
          <option value="Europian">Европейская</option>
          <option value="Kyrgyz">Киргизская</option>
          <option value="Russian">Русская</option>
          <option value="Japan">Японская</option>
          <option value="Chinese">Китайская</option>
        </select>
      </div>
      <div>
        <label>Тип продукта:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Выберите тип продукта</option>
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
        />
      </div>
      <div>
        <label>Рецепт:</label>
        <textarea value={recipe} onChange={(e) => setRecipe(e.target.value)} />
      </div>
      <div>
        <label>Уровень сложности:</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">Выберите уровень сложности</option>
          <option value="Easy">Простой</option>
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
        />
      </div>
      <div>
        <label>Описание:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {selectedIngredients.map((_, index) => (
        <div className="ingredient-item" key={index}>
          <select
            value={selectedIngredients[index] || ""}
            onChange={(e) => {
              const selected =
                e.target.value !== "" ? parseInt(e.target.value) : null;
              setSelectedIngredients(
                selectedIngredients.map((ing, i) =>
                  i === index ? selected : ing
                )
              );
            }}
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
      <button type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Отправка..." : "Отправить"}
      </button>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
