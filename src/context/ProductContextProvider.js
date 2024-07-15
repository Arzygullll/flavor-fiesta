import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../helpers/const";

const productContext = createContext();

export const useProduct = () => useContext(productContext);

const ProductContextProvider = ({ children }) => {
  const INIT_STATE = {
    products: [],
    oneProduct: {},
    pages: 10,
  };

  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
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

  const getConfig = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const Authorization = `Bearer ${tokens.access.access}`;
    const config = {
      headers: { Authorization },
    };
    return config;
  };

  const getProducts = async () => {
    try {
      const { data } = await axios(
        `${API}/dish/${window.location.search}`,
        getConfig()
      );
      dispatch({
        type: "GET_PRODUCTS",
        payload: data.results,
      });
      console.log(data.results);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const addProduct = async (product) => {
    try {
      await axios.post(`${API}/dish/`, product, getConfig());
      // Optionally, fetch products again after adding a new one
      getProducts();
    } catch (error) {
      console.log("Error adding product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/dish/${id}/`, getConfig());
      getProducts(); // Refresh product list after deletion
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  const getOneProduct = async (id) => {
    try {
      const { data } = await axios(`${API}/dish/${id}/`, getConfig());
      dispatch({
        type: "GET_ONE_PRODUCT",
        payload: data,
      });
    } catch (error) {
      console.log("Error fetching product details:", error);
    }
  };

  const editProduct = async (id, editedProduct) => {
    try {
      await axios.patch(`${API}/dish/${id}/`, editedProduct, getConfig());
      navigate("/productList"); // Navigate after editing
    } catch (error) {
      console.log("Error editing product:", error);
    }
  };

  const values = {
    products: state.products,
    getProducts,
    addProduct,
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
