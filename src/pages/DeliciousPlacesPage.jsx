// export default DeliciousPlacesPage;
import React from "react";
import "./DeliciousPlacesPage.css";

const DeliciousPlacesPage = () => {
  return (
    <div>
      {/* Секция с популярными достопримечательностями Кыргызстана */}
      <section className="tab-tours">
        <div className="theme-overlay"></div>
        <div className="tour-list">
          <h2>Рестораны "Мишлен"</h2>
          <ul>
            <li>
              <div class="tour-item">
                <img
                  src="https://i.pinimg.com/236x/aa/3b/8a/aa3b8a2dae2aecbbb51bfde99590db29.jpg"
                  alt="Ресторан мишлен"
                />
                <div class="tour-details">
                  <a href="">Ресторан мишлен Франции</a>
                  <p>
                    Расположение: Эйфелева башня, Париж, Франция. Шеф-повар:
                    Бенжамен Топин. Описание: Ресторан Le Jules Verne находится
                    на втором уровне Эйфелевой башни и предлагает потрясающие
                    виды на Париж. Это место сочетает в себе элегантную
                    атмосферу и высококлассную кухню. Ресторан получил звезду
                    Michelin за свои исключительные блюда и выдающийся сервис.
                    Кухня: Современная французская кухня с акцентом на сезонные
                    ингредиенты и инновационные техники.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="tour-item">
                <img src="https://i.pinimg.com/236x/08/77/77/08777758f538bd80faa77e2b5b7ee713.jpg" />
                <div class="tour-details">
                  <a href="">Ресторан мишлен Италии</a>
                  <p>
                    Osteria Francescana Расположение: Модена, Эмилия-Романья,
                    Италия. Шеф-повар: Массимо Боттура. Описание: Osteria
                    Francescana — это один из самых известных и уважаемых
                    ресторанов в мире. Под руководством шеф-повара Массимо
                    Боттуры, ресторан получил три звезды Michelin, что является
                    высшей наградой в ресторанной индустрии. Osteria Francescana
                    славится своим креативным подходом к традиционной
                    итальянской кухне и инновационными блюдами.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="tour-item">
                <img
                  src="https://i.pinimg.com/236x/dc/56/3b/dc563bf37b7a90f7849838760ffbcec4.jpg"
                  alt="Ресторан мишлен"
                />
                <div class="tour-details">
                  <a href="">Ресторан мишлен Бразилии</a>
                  <p>
                    D.O.M. Расположение: Сан-Паулу, Бразилия. Шеф-повар: Алекс
                    Атала. Описание: Ресторан D.O.M. — это один из наиболее
                    выдающихся и признанных ресторанов в Латинской Америке.
                    Шеф-повар Алекс Атала известен своими инновациями в области
                    бразильской кухни и использованием уникальных местных
                    ингредиентов. D.O.M. получил звезды Michelin за
                    исключительное качество блюд и высокий уровень обслуживания.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="tour-item">
                <img
                  src="https://i.pinimg.com/236x/56/71/88/567188db41a311359db8f8a6cd0d83d8.jpg"
                  alt="Ресторан мишлен"
                />
                <div class="tour-details">
                  <a href="">Ресторан Мишлен Мексика</a>
                  <p>
                    Pujol Расположение: Мехико, Мексика. Шеф-повар: Энрике
                    Ольвера. Описание: Pujol — это один из самых известных
                    ресторанов в Мексике и Латинской Америке. Под руководством
                    шеф-повара Энрике Ольверы ресторан получил признание за свою
                    инновационную интерпретацию мексиканской кухни. Pujol часто
                    попадает в списки лучших ресторанов мира и имеет звезду
                    Michelin за выдающееся качество еды и сервиса.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="tour-item">
                <img
                  src="https://i.pinimg.com/236x/3b/2c/6a/3b2c6aae8c4ba7e5578fc4c0e0ce5c2b.jpg"
                  alt="Рестораны мишлен"
                />
                <div class="tour-details">
                  <a href="">Ресторан Мишлен Швеция</a>
                  <p>
                    {" "}
                    Frantzén Расположение: Стокгольм, Швеция. Шеф-повар: Бьорн
                    Франссон. Описание: Ресторан Frantzén, который был удостоен
                    трех звезд Michelin, является одним из самых престижных
                    ресторанов в Швеции. Бьорн Франссон и его команда предлагают
                    уникальные гастрономические опыты, сочетая шведские традиции
                    с современными техниками и ингредиентами.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="tour-item">
                <img
                  src="https://i.pinimg.com/474x/df/41/79/df417953e581e6fc5c19926124460423.jpg"
                  alt="Рестораны мишлен"
                />
                <div class="tour-details">
                  <a href="">Ресторвн мишлен Тайланд </a>
                  <p>
                    Gaa Расположение: Бангкок. Шеф-повар: Ли Ли. Описание: Gaa
                    предлагает уникальную гастрономическую концепцию, сочетающую
                    индийские и тайские кулинарные традиции. Ресторан получил
                    звезду Michelin за свое инновационное меню и
                    высококачественное исполнение блюд.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="tour-item">
                <img
                  src="https://i.pinimg.com/236x/ef/31/77/ef31771678741830458f1591b6c5ad3a.jpg"
                  alt="Ресторан мишлен"
                />
                <div class="tour-details">
                  <a href="">Ресторан мишлен Испания</a>
                  <p>
                    Испания славится своим богатым гастрономическим наследием и
                    множеством ресторанов, удостоенных звезд Michelin. Вот
                    несколько из них: El Celler de Can Roca (Жирона):
                    Шеф-повара: Братья Рока — Жоан, Хосеп и Жорди Рока.
                    Описание: Этот ресторан был признан лучшим в мире по версии
                    The World's 50 Best Restaurants. Он известен своими
                    инновационными блюдами, основанными на каталонской кухне.
                    Особенности: Три звезды Michelin, креативные и тщательно
                    продуманные блюда.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="tour-item">
                <img
                  src="https://i.pinimg.com/474x/f0/7a/6b/f07a6bf284c250c244792efcde98e43b.jpg"
                  alt="Ресторан мишлен"
                />
                <div class="tour-details">
                  <a href="">Ресторан мишлен Лондон</a>
                  <p>
                    Restaurant Gordon Ramsay Расположение: Лондон, Англия.
                    Шеф-повар: Гордона Рамзи. Описание: Этот ресторан,
                    возглавляемый знаменитым шеф-поваром Гордоном Рамзи, получил
                    три звезды Michelin, что является высшей наградой в
                    ресторанной индустрии. Restaurant Gordon Ramsay предлагает
                    исключительное качество еды и высокий уровень обслуживания.
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div class="tour-item">
                <img
                  src="https://i.pinimg.com/236x/61/bf/32/61bf32961e4a47fca2e68bd5fa4bc727.jpg"
                  alt="Ресторан мишлен"
                />
                <div class="tour-details">
                  <a href="">Ресторан мишлен Корея</a>
                  <p>
                    Корея: рестораны Мишлен Корея – настоящий рай для гурманов.
                    От стритфуда до роскошных ресторанов – здесь найдется все,
                    чтобы покорить сердца туристов. Искушенным гурманам,
                    определенно, придутся по вкусу рестораны со звездами Мишлен.
                    LA YEON – Мишлен ★★★
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
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
            <h5>Путешествуйте по миру вкусов с нами!</h5>
            <p>
              Подписывайтесь, чтобы быть в курсе самых захватывающих рецептов и
              кулинарных тайн, которые вдохновят вас на новые гастрономические
              приключения. Оставайтесь с нами и откройте для себя секреты,
              которые превратят каждое блюдо в произведение искусства!
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
            <h5>Контакты</h5>
            <p>Телефон: +996 123 456 789</p>
            <p>Email: info@flavorfiesta.com</p>
            <p>Адрес: ул. Московская, 123</p>
          </div>
        </div>
        <div className="footer-credits">
          <p>© 2024 Flavor Fiesta. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default DeliciousPlacesPage;
