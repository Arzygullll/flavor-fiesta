import React, { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContextProvider";
import ProductCard from "./ProductCard";
import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const { products, getProducts, pages } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);

  const getPagesCount = () => {
    const pageCountArr = [];
    for (let i = 1; i <= pages; i++) {
      pageCountArr.push(i);
    }
    return pageCountArr;
  };

  useEffect(() => {
    if (currentPage < 1) setCurrentPage(1);
    if (currentPage > pages) setCurrentPage(pages);
  }, [currentPage, pages]);

  return (
    <div>
      <h1>Product List</h1>
      {products && products.length > 0 ? (
        products.map((elem) => <ProductCard key={elem.id} elem={elem} />)
      ) : (
        <p>No products available</p>
      )}
      <Pagination>
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
        {getPagesCount().map((elem) =>
          elem === currentPage ? (
            <Pagination.Item active key={elem}>
              {elem}
            </Pagination.Item>
          ) : (
            <Pagination.Item key={elem} onClick={() => setCurrentPage(elem)}>
              {elem}
            </Pagination.Item>
          )
        )}
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
      </Pagination>
    </div>
  );
};

export default ProductList;
