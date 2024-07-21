import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductContextProvider from "./context/ProductContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";
import CartContextProvider from "./context/CartContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
