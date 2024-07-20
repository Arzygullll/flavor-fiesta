import React, { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContextProvider";
import ProductCard from "./ProductCard";
import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import "./ProductList.css"; // Импортируем CSS-файл для стилей

const ProductList = () => {
  const { dishes, getDishes } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Fetch dishes when searchParams change
    getDishes();
  }, [searchParams, getDishes]);

  useEffect(() => {
    // Update searchParams with current page
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    // Ensure currentPage stays within valid range
    if (currentPage < 1) setCurrentPage(1);
    if (dishes.length && currentPage > Math.ceil(dishes.length / 4))
      setCurrentPage(Math.ceil(dishes.length / 4));
  }, [currentPage, dishes]);

  console.log("Dishes state:", dishes); // Отладочная информация

  const renderProductCards = () => {
    // Проверка, является ли dishes массивом
    if (!Array.isArray(dishes)) {
      return <p className="no-products-message">Нет доступных блюд</p>;
    }

    // Проверка, пуст ли массив dishes
    if (dishes.length === 0) {
      return <p className="no-products-message">Нет доступных блюд</p>;
    }

    const startIndex = (currentPage - 1) * 4;
    const endIndex = startIndex + 4;
    const currentDishes = dishes.slice(startIndex, endIndex);

    return (
      <div className="product-card-container">
        {currentDishes.map((elem) => (
          <ProductCard key={elem.id} elem={elem} />
        ))}
      </div>
    );
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageItems = () => {
    if (!Array.isArray(dishes)) {
      return null;
    }

    const pageCountArr = [];
    const maxPages = Math.ceil(dishes.length / 4);

    for (let i = 1; i <= maxPages; i++) {
      pageCountArr.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pageCountArr;
  };

  return (
    <div className="product-list-container">
      <h1>Список блюд</h1>
      {renderProductCards()}
      <Pagination>
        <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)} />
        {renderPageItems()}
        <Pagination.Next onClick={() => handlePageClick(currentPage + 1)} />
      </Pagination>
    </div>
  );
};

export default ProductList;
