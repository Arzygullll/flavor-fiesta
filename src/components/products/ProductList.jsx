import React, { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContextProvider";
import ProductCard from "./ProductCard";
import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import "./ProductList.css"; // Импортируем CSS-файл для стилей

const ProductList = () => {
  const { products, getProducts, pages } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Fetch products when searchParams change
    getProducts();
  }, [searchParams, getProducts]);

  useEffect(() => {
    // Update searchParams with current page
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    // Ensure currentPage stays within valid range
    if (currentPage < 1) setCurrentPage(1);
    if (currentPage > pages) setCurrentPage(pages);
  }, [currentPage, pages]);

  const renderProductCards = () => {
    // Calculate index range for current page
    const startIndex = (currentPage - 1) * 4;
    const endIndex = startIndex + 4;

    // Slice products array to get products for current page
    const currentProducts = products.slice(startIndex, endIndex);

    return (
      <div className="product-card-container">
        {currentProducts.length > 0 ? (
          currentProducts.map((elem) => (
            <ProductCard key={elem.id} elem={elem} />
          ))
        ) : (
          <p className="no-products-message">No products available</p>
        )}
      </div>
    );
  };

  const handlePageClick = (page) => {
    // Update currentPage when pagination button is clicked
    setCurrentPage(page);
  };

  const renderPageItems = () => {
    const pageCountArr = [];
    const maxPages = Math.min(pages, 5); // Show up to 5 pages

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
      <h1>Product List</h1>
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
