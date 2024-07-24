import React from "react";
import "./AboutPage.css";
function AboutPage() {
  return (
    <div className="about-page" style={{ fontFamily: "cursive" }}>
      <h1
        className="fade-in"
        style={{
          display: "flex",
          marginTop: "80px",
          justifyContent: "center",
          fontSize: "90px",
          color: "white",
        }}
      >
        About us
      </h1>

      <div style={{ display: "flex", marginTop: "80px" }}>
        <img
          className="fade-in slide-from-left"
          style={{
            width: "650px",
            height: "350px",
            marginLeft: "80px",
            borderRadius: "60px",
          }}
          src="https://kartinki.pics/uploads/posts/2021-03/thumbs/1617184437_2-p-yeda-v-restorane-krasivo-2.jpg"
          alt=""
        />
        <h4
          className="fade-in slide-from-right"
          style={{
            marginLeft: "30px",
            textAlign: "center",
            marginTop: "50px",
            fontFamily: "cursive",
            color: "white",
          }}
        >
          Delicious Adventure Travel Cooking is not easy cooking is an art that
          transforms simple ingredients into unforgettable dishes. Every recipe
          is like a map, leading us into the world of tastes and aromas, where
          we can become real culinary artists. Why just cook when you can
          create? masterpieces that will delight the eyes and taste buds?
        </h4>
      </div>
      <div style={{ display: "flex", marginTop: "80px" }}>
        <h4
          className="fade-in slide-from-left"
          style={{
            marginLeft: "30px",
            textAlign: "center",
            marginTop: "50px",
            fontFamily: "cursive",
            color: "white",
          }}
        >
          Culinary Creativity In the kitchen you have the opportunity to express
          your creativity. Every time you cook you create something unique.
          Cooking is not only about delicious food, but also about make the
          cooking process fun and inspiring. So don't be afraid to make mistakes
          and try something new - that's part of a fascinating journey into the
          world of cooking.
        </h4>
        <img
          className="fade-in slide-from-right"
          style={{
            width: "550px",
            height: "350px",
            marginLeft: "50px",
            borderRadius: "60px",
          }}
          src="https://media.istockphoto.com/id/1081422898/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%B0%D0%BD-%D0%B6%D0%B0%D1%80%D0%B5%D0%BD%D0%B0%D1%8F-%D1%83%D1%82%D0%BA%D0%B0.jpg?s=612x612&w=0&k=20&c=YWaW6kOkwsV_Lrl4kYl5Ngm_Z-ZXk4BBMT_ZsGVp5fA="
          alt=""
        />
      </div>
      <div style={{ display: "flex", marginTop: "80px" }}>
        <img
          className="fade-in slide-from-left"
          style={{
            width: "550px",
            height: "350px",
            marginLeft: "50px",
            borderRadius: "60px",
            marginBottom: "100px",
          }}
          src="https://img.freepik.com/free-photo/beautiful-food-restaurant-wedding-day_8353-9624.jpg"
          alt=""
        />
        <h4
          className="fade-in slide-from-right"
          style={{
            marginLeft: "30px",
            textAlign: "center",
            marginTop: "60px",
            color: "white",
            fontFamily: "cursive",
          }}
        >
          Culinary Traditions and Innovations The history of cuisine is history
          humanity. From ancient times to modern times, methods and ingredients
          have changed, but the passion for food has remained unchanged. Today
          modern technology and innovation in cooking help us cook faster and
          more convenient, but this does not negate the importance of preserving
          traditions and respect for culinary heritage.
        </h4>
      </div>
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
}

export default AboutPage;
