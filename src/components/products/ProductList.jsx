import React, { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContextProvider";
import ProductCard from "./ProductCard";
import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const { dishes, getDishes } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getDishes();
  }, [searchParams, getDishes]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    if (currentPage < 1) setCurrentPage(1);
    if (dishes.length && currentPage > Math.ceil(dishes.length / 3))
      setCurrentPage(Math.ceil(dishes.length / 3));
  }, [currentPage, dishes]);

  console.log("Dishes state:", dishes);

  const renderProductCards = () => {
    if (!Array.isArray(dishes)) {
      return <p className="no-products-message">Нет доступных блюд</p>;
    }

    if (dishes.length === 0) {
      return <p className="no-products-message">Нет доступных блюд</p>;
    }

    const startIndex = (currentPage - 1) * 3;
    const endIndex = startIndex + 3;
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
