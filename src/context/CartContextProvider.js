import React, { createContext, useContext, useReducer } from "react";
import {
  calcSubPrice,
  calcTotalPrice,
  getLocalStorage,
  getProductsCountInCart,
} from "../helpers/functions";

export const cartContext = createContext();
export const useCart = () => useContext(cartContext);

const CartContextProvider = ({ children }) => {
  const INIT_STATE = {
    cart: {
      products: [],
      totalPrice: 0,
    },
    cartLength: getProductsCountInCart(),
  };

  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case "GET_CART":
        return { ...state, cart: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const addProductToCart = (product) => {
    let cart = getLocalStorage();
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let newProduct = {
      item: product,
      count: 1,
      subPrice: product.price,
    };
    let productToFind = cart.products.filter(
      (elem) => elem.item.id === product.id
    );
    if (productToFind.length === 0) {
      cart.products.push(newProduct);
    } else {
      cart.products = cart.products.filter(
        (elem) => elem.item.id !== product.id
      );
    }
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };

  const getCart = () => {
    let cart = getLocalStorage();
    if (!cart) {
      localStorage.setItem(
        "cart",
        JSON.stringify({ products: [], totalPrice: 0 })
      );
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };

  const checkProductInCart = (id) => {
    let cart = getLocalStorage();
    if (cart) {
      let newCart = cart.products.filter((elem) => elem.item.id === id);
      return newCart.length > 0 ? true : false;
    }
  };

  const changeProductCount = (id, value) => {
    let cart = getLocalStorage();
    cart.products = cart.products.map((elem) => {
      if (elem.item.id == id) {
        elem.count = value;
        elem.subPrice = calcSubPrice(elem);
      }
      return elem;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };

  const deleteProductFromCart = (id) => {
    let cart = getLocalStorage();
    cart.products = cart.products.filter((elem) => elem.item.id !== id);
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };

  const values = {
    cart: state.cart,
    addProductToCart,
    checkProductInCart,
    changeProductCount,
    deleteProductFromCart,
    getCart,
  };

  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default CartContextProvider;
