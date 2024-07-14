import React, { useEffect } from "react";
import videoBg from "../homePage/assets/videoplayy.mp4";
import "../homePage/HeaderHomePage.css";

const HeaderHomePage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const parallaxContainer = document.querySelector(".highlight-tag");
      parallaxContainer.style.backgroundPositionY = `${-scrollTop * 0.5}px`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="container">
      {/* Секция highlight-tag */}
      <section className="highlight-tag">
        <div className="highlight-content">
          <h1>Праздник вкусов и кулинарных открытий каждый день!</h1>
        </div>
      </section>
      {/*  */}
      <div className="main">
        <div className="overlay"></div>
        <video className="background-video" src={videoBg} autoPlay loop muted />
        <div className="content">
          <h4>
            Рецепты, книги, заведения – все для поваров и любителей кулинарии.
            Давайте вместе открывать новые вкусы мира!
          </h4>
        </div>
      </div>
      <section className="section4"></section>
      <footer className="footer"></footer>
    </div>
  );
};

export default HeaderHomePage;
