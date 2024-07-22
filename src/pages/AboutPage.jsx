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
        О нас
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
          Вкусная Приключенческая Путешествие Кулинария – это не просто
          приготовление пищи, это искусство, которое превращает простые
          ингредиенты в незабываемые блюда. Каждый рецепт – это как карта,
          ведущая нас в мир вкусов и ароматов, где мы можем стать настоящими
          кулинарными художниками. Зачем просто готовить, если можно создавать
          шедевры, которые будут радовать глаза и вкусовые рецепторы?
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
          Кулинарное Творчество На кухне у вас есть возможность проявить свою
          креативность. Каждый раз, когда вы готовите, вы создаете что-то
          уникальное. Кулинария – это не только о вкусной еде, но и о том, чтобы
          сделать процесс приготовления увлекательным и вдохновляющим. Так что
          не бойтесь делать ошибки и пробовать что-то новое – это часть
          увлекательного путешествия в мир кулинарии.
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
          Кулинарные Традиции и Инновации История кухни – это история
          человечества. С древних времен до современности, методы и ингредиенты
          изменялись, но страсть к еде осталась неизменной. Сегодня современные
          технологии и инновации в кулинарии помогают нам готовить быстрее и
          удобнее, но это не отменяет важности сохранения традиций и уважения к
          кулинарному наследию.
        </h4>
      </div>
    </div>
  );
}

export default AboutPage;
