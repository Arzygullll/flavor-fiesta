import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../components/products/AddProduct";
import ProductList from "../components/products/ProductList";
import EditProduct from "../components/products/EditProduct";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import RecipesPage from "../pages/RecipesPage";
import BooksPage from "../pages/BooksPage";
import DeliciousPlacesPage from "../pages/DeliciousPlacesPage";
import AboutPage from "../pages/AboutPage";
import HeaderHomePage from "../components/homePage/HeaderHomePage";
import ResetPassword from "../components/auth/ResetPassword";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HeaderHomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/productList" element={<ProductList />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/deliciousPlaces" element={<DeliciousPlacesPage />} />
      <Route path="/about" element={<AboutPage />} />

      <Route path="*" element={<h1>NOT FOUND PAGE</h1>} />
    </Routes>
  );
};

export default MainRoutes;
