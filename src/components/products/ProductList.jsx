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
      <h1>List of dishes</h1>
      {renderProductCards()}
      <Pagination>
        <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)} />
        {renderPageItems()}
        <Pagination.Next onClick={() => handlePageClick(currentPage + 1)} />
      </Pagination>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-social">
            <a
              href="https://www.instagram.com"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-256.png"
                alt=""
              />
            </a>
            <a
              href="https://telegram.org"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn3.iconfinder.com/data/icons/social-icons-33/512/Telegram-256.png"
                alt=""
              />
            </a>
            <a
              href="https://www.youtube.com"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_youtube-256.png"
                alt=""
              />
            </a>
          </div>
          <div className="footer-text">
            <h5>Travel the world of tastes with us!</h5>
            <p>
              Subscribe to stay up to date with the most exciting recipes and
              culinary secrets that will inspire you to new gastronomic
              adventures. Stay with us and discover the secrets, which will turn
              every dish into a work of art!
            </p>
            <div className="footer-decor">
              <span className="decor-icon">&#9733;</span>
              <span className="decor-icon">&#9733;</span>
              <span className="decor-icon">&#9733;</span>
              <span className="decor-icon">&#9733;</span>
              <span className="decor-icon">&#9733;</span>
            </div>
          </div>
          <div className="footer-contacts">
            <h5>Contacts</h5>
            <p>Phone: +996 123 456 789</p>
            <p>Email: info@flavorfiesta.com</p>
            <p>Address: st. Moscow, 123</p>
          </div>
        </div>
        <div className="footer-credits">
          <p>© 2024 Flavor Fiesta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductList;
