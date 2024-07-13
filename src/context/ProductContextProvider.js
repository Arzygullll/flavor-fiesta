// import axios from "axios";
// import React, { createContext, useContext, useReducer } from "react";
// import { API } from "../helpers/const";
// import { type } from "@testing-library/user-event/dist/type";

import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { API } from "../helpers/const";

const productContext = createContext();

export const useProduct = () => useContext(productContext);

const ProductContextProvider = ({ children }) => {
  const INIT_STATE = {
    categories: [],
    products: [],
    pages: 10,
  };
  const reduser = (state = INIT_STATE, action) => {
    switch (action.type) {
      case "GET_CATEGORIES":
        return { ...state, categories: action.payload };
      case "GET_PRODUCTS":
        return { ...state, products: action.payload };
    }
  };
  const [state, dispatch] = useReducer(reduser, INIT_STATE);
  //   !getConfig
  const getConfig = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const Authorization = `Bearer ${tokens.access.access}`;
    const config = {
      headers: { Authorization },
    };
    return config;
  };

  //   !getCategories
  const getCategories = async () => {
    const { data } = await axios(`${API}/category/list/`, getConfig());
    dispatch({
      type: "GET_CATEGORIES",
      payload: data.results,
    });
  };
  //   !add
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

  const values = {
    categories: state.categories,
    getCategories,
    addProduct,
    getProducts,
    products: state.products,
    pages: state.pages,
    deleteProduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
