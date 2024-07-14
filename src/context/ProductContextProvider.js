import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../helpers/const";

const productContext = createContext();

export const useProduct = () => useContext(productContext);

const ProductContextProvider = ({ children }) => {
  const INIT_STATE = {
    categories: [],
    products: [],
    oneProduct: {},
    pages: 10,
  };

  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case "GET_CATEGORIES":
        return { ...state, categories: action.payload };
      case "GET_PRODUCTS":
        return { ...state, products: action.payload };
      case "GET_ONE_PRODUCT":
        return { ...state, oneProduct: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const navigate = useNavigate();
  // !getConfig
  const getConfig = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const Authorization = `Bearer ${tokens.access.access}`;
    const config = {
      headers: { Authorization },
    };
    return config;
  };
  // !getCategories
  const getCategories = async () => {
    const { data } = await axios(`${API}/category/list/`, getConfig());
    dispatch({
      type: "GET_CATEGORIES",
      payload: data.results,
    });
  };
  // !add
  const addProduct = async (product) => {
    try {
      await axios.post(`${API}/products/`, product, getConfig());
    } catch (error) {
      console.log(error);
    }
  };
  // !get
  const getProducts = async () => {
    const { data } = await axios(
      `${API}/products/${window.location.search}`,
      getConfig()
    );
    dispatch({
      type: "GET_PRODUCTS",
      payload: data.results,
    });
  };
  // !delete
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/products/${id}/`, getConfig());
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  // !edit
  const getOneProduct = async (id) => {
    const { data } = await axios(`${API}/products/${id}/`, getConfig());
    dispatch({
      type: "GET_ONE_PRODUCT",
      payload: data,
    });
  };

  const editProduct = async (id, editedProduct) => {
    await axios.patch(`${API}/products/${id}/`, editedProduct, getConfig());
    navigate("/productList");
  };

  const values = {
    categories: state.categories,
    getCategories,
    addProduct,
    getProducts,
    products: state.products,
    pages: state.pages,
    deleteProduct,
    getOneProduct,
    oneProduct: state.oneProduct,
    editProduct,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
