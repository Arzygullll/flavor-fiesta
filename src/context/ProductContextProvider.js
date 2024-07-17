import axios from "axios";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../helpers/const";

const productContext = createContext();

export const useProduct = () => useContext(productContext);

const ProductContextProvider = ({ children }) => {
  const INIT_STATE = {
    products: [],
    oneProduct: {},
    ingredientsList: [],
    ingredientsGetList: [],
    pages: 10,
  };

  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case "GET_PRODUCTS":
        return { ...state, products: action.payload };
      case "GET_ONE_PRODUCT":
        return { ...state, oneProduct: action.payload };
      case "GET_INGREDIENTS_LIST":
        return { ...state, ingredientsList: action.payload };
      case "GET_INGREDIENTS_GET_LIST":
        return { ...state, ingredientsGetList: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const navigate = useNavigate();

  const getConfig = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const Authorization = `Bearer ${tokens?.access}`;
    const config = {
      headers: { Authorization },
    };
    return config;
  };

  const refreshToken = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const response = await axios.post(`${API}/token/refresh/`, {
        refresh: tokens.refresh,
      });
      const newTokens = {
        access: response.data.access,
        refresh: tokens.refresh,
      };
      localStorage.setItem("tokens", JSON.stringify(newTokens));
      return newTokens;
    } catch (error) {
      console.error("Error refreshing token:", error);
      navigate("/login");
      throw error;
    }
  };

  const authenticatedRequest = async (
    url,
    method = "get",
    data = null,
    headers = {}
  ) => {
    let config;

    try {
      config = { headers: { ...getConfig().headers, ...headers } };
      const response = await axios({
        url: url,
        method: method,
        data: data,
        headers: config.headers,
      });

      return response;
    } catch (error) {
      if (error.response && error.response.data.code === "token_not_valid") {
        const newTokens = await refreshToken();
        const response = await axios({
          url,
          method,
          data,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newTokens.access}`,
          },
        });
        return response;
      } else {
        throw error;
      }
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await authenticatedRequest(
        `${API}/dish/${window.location.search}`
      );
      dispatch({
        type: "GET_PRODUCTS",
        payload: data.results,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async (product) => {
    try {
      await authenticatedRequest(`${API}/dish/`, "post", product);
      getProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await authenticatedRequest(`${API}/dish/${id}/`, "delete");
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const getOneProduct = async (id) => {
    try {
      const { data } = await axios(`${API}/dish/${id}/`);
      dispatch({
        type: "GET_ONE_PRODUCT",
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const editProduct = async (id, editedProduct) => {
    try {
      await axios.patch(`${API}/dish/${id}/`, editedProduct, getConfig());
      navigate("/productList");
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const getIngredientsList = async () => {
    try {
      const { data } = await authenticatedRequest(`${API}/ingridients/`);
      dispatch({
        type: "GET_INGREDIENTS_LIST",
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching ingredients list:", error);
    }
  };

  const getIngredientsGetList = async () => {
    try {
      const { data } = await authenticatedRequest(`${API}/ingridients/get/`);
      dispatch({
        type: "GET_INGREDIENTS_GET_LIST",
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching ingredients get list:", error);
    }
  };

  useEffect(() => {
    getProducts();
    getIngredientsList();
    getIngredientsGetList();
  }, []);

  const values = {
    products: state.products,
    getProducts,
    addProduct,
    deleteProduct,
    getOneProduct,
    oneProduct: state.oneProduct,
    editProduct,
    pages: state.pages,
    ingredientsList: state.ingredientsList,
    ingredientsGetList: state.ingredientsGetList,
    getIngredientsList,
    getIngredientsGetList,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
