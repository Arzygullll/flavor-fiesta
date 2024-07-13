import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../components/products/AddProduct";
import ProductList from "../components/products/ProductList";
import EditProduct from "../components/products/EditProduct";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>HOME PAGE</h1>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/productList" element={<ProductList />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="*" element={<h1>NOT FOUND PAGE</h1>} />
    </Routes>
  );
};

export default MainRoutes;
