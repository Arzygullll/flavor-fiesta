import React, { useCallback, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../helpers/const";

export const productContext = React.createContext();

export const useProduct = () => React.useContext(productContext);

const ProductContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const INIT_STATE = {
    dishes: [],
    oneDish: null,
    ingredientsList: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_DISHES":
        return { ...state, dishes: action.payload.results || [] }; // Ensure results are used if present
      case "GET_ONE_DISH":
        return { ...state, oneDish: action.payload };
      case "GET_INGREDIENTS_LIST":
        return { ...state, ingredientsList: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getConfig = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    if (!tokens || !tokens.access) {
      throw new Error("Токен не найден");
    }
    return {
      headers: { Authorization: `Bearer ${tokens.access}` },
    };
  };

  const getDishes = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/dish/`, getConfig());
      console.log("Fetched dishes:", response.data);
      dispatch({ type: "GET_DISHES", payload: response.data });
    } catch (error) {
      console.error("Ошибка при получении блюд:", error);
    }
  }, []);

  const getOneDish = async (id) => {
    try {
      const { data } = await axios.get(`${API}/dish/${id}/`, getConfig());
      dispatch({ type: "GET_ONE_DISH", payload: data });
    } catch (error) {
      console.error(
        "Ошибка при получении блюда:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getIngredientsList = async () => {
    try {
      const { data } = await axios.get(`${API}/ingridients/get/`);
      dispatch({
        type: "GET_INGREDIENTS_LIST",
        payload: data,
      });
      return data;
    } catch (error) {
      console.error("Ошибка при получении списка ингредиентов:", error);
      throw error;
    }
  };

  const addDish = async (dish) => {
    try {
      const response = await axios.post(`${API}/dish/`, dish, getConfig());
      if (response.status === 201) {
        await getDishes();
        navigate("/productList");
      }
    } catch (error) {
      console.error(
        "Ошибка при добавлении блюда:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteDish = async (id) => {
    try {
      await axios.delete(`${API}/dish/${id}/`, getConfig());
      await getDishes();
    } catch (error) {
      console.error(
        "Ошибка при удалении блюда:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const editDish = async (id, editedDish) => {
    try {
      await axios.patch(`${API}/dish/${id}/`, editedDish, getConfig());
      await getDishes();
      navigate("/dishList");
    } catch (error) {
      console.error(
        "Ошибка при редактировании блюда:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const values = {
    dishes: state.dishes,
    oneDish: state.oneDish,
    ingredientsList: state.ingredientsList,
    getDishes,
    getOneDish,
    addDish,
    deleteDish,
    editDish,
    getIngredientsList,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
