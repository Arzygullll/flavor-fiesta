import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import videoBg from "../homePage/assets/videoplayy.mp4";
import "../homePage/HeaderHomePage.css";

const HeaderHomePage = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const questions = [
    {
      question: "1. Какой главный ингредиент в ризотто?",
      options: ["Рис", "Макароны", "Картофель", "Мясо"],
      correctAnswer: "Рис",
    },
    {
      question: "2. Из какой страны происходит суши?",
      options: ["Китай", "Япония", "Южная Корея", "Таиланд"],
      correctAnswer: "Япония",
    },
    {
      question: "3. Какой соус используется в классическом Цезаре?",
      options: ["Цезарь", "Ранч", "Бальзамико", "Соевый соус"],
      correctAnswer: "Цезарь",
    },
    {
      question: "4. Какая рыба традиционно используется в тар-тар?",
      options: ["Лосось", "Тунец", "Скумбрия", "Сельдь"],
      correctAnswer: "Тунец",
    },
    {
      question: "5. Какой тип пасты имеет форму спагетти?",
      options: ["Пенне", "Фусилли", "Спагетти", "Равиоли"],
      correctAnswer: "Спагетти",
    },
    {
      question: "6. Какой овощ используется для приготовления гуакамоле?",
      options: ["Помидор", "Авокадо", "Огурец", "Перец"],
      correctAnswer: "Авокадо",
    },
    {
      question: "7. Что такое фуа-гра?",
      options: ["Мясной соус", "Изысканная печень утки", "Сыр", "Фрукты"],
      correctAnswer: "Изысканная печень утки",
    },
    {
      question:
        "8. Какой традиционный итальянский десерт готовят из сыра маскарпоне?",
      options: ["Тирамису", "Панна котта", "Софрито", "Канноли"],
      correctAnswer: "Тирамису",
    },
    {
      question: "9. Из какого региона происходит сыр пармезан?",
      options: ["Франция", "Италия", "Испания", "Греция"],
      correctAnswer: "Италия",
    },
    {
      question: "10. Какая специя используется в традиционном тайском карри?",
      options: ["Куркума", "Кориандр", "Кардамон", "Чили"],
      correctAnswer: "Куркума",
    },
  ];

  const handleAnswerSelect = (answer) => {
    if (isQuizFinished) return;

    setSelectedOption(answer);
    const isAnswerCorrect = answer === questions[questionIndex].correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }

    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setIsQuizFinished(true);
      }
    }, 1000); // Transition delay
  };

  const handleRestartQuiz = () => {
    setQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore({ correct: 0, incorrect: 0 });
    setIsQuizFinished(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const parallaxContainers = document.querySelectorAll(
        ".highlight-tag, .section3"
      );
      parallaxContainers.forEach((container) => {
        container.style.backgroundPositionY = `${-scrollTop * 0.5}px`;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <section className="highlight-tag">
        <div className="highlight-content">
          <h1>Праздник вкусов и кулинарных открытий каждый день!</h1>
        </div>
      </section>

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

      <section className="section3">
        <h2>Время для кулинарной викторины!</h2>
        <p>
          Проверьте, насколько хорошо вы знаете вкусные блюда и кулинарные
          тренды. Удачи!
        </p>

        {!isQuizFinished ? (
          <div className="quiz-container">
            <h3 className="question">{questions[questionIndex].question}</h3>
            <div className="options">
              {questions[questionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${
                    selectedOption === option
                      ? isCorrect
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {isCorrect !== null && (
              <p className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
                {isCorrect ? "Правильно!" : "Неправильно, попробуйте еще раз."}
              </p>
            )}

            {showConfetti && <Confetti />}
          </div>
        ) : (
          <div className="quiz-results">
            <h3>Викторина завершена!</h3>
            <p>Правильные ответы: {score.correct}</p>
            <p>Неправильные ответы: {score.incorrect}</p>
            <button className="restart-button" onClick={handleRestartQuiz}>
              Начать заново
            </button>
          </div>
        )}
      </section>

      <footer className="footer">
        <div className="footer-content">
          <h5>
            Путешествуйте по миру вкусов с нами <br /> и погружайтесь в мир
            кулинарных чудес!
          </h5>
          <p>
            Подписывайтесь, чтобы быть в курсе самых захватывающих рецептов и
            кулинарных тайн, которые вдохновят вас на новые гастрономические
            приключения. Оставайтесь с нами и откройте для себя секреты, которые
            превратят каждое блюдо в произведение искусства!
          </p>
          <div className="footer-decor">
            <span className="decor-icon">&#9733;</span>
            <span className="decor-icon">&#9733;</span>
            <span className="decor-icon">&#9733;</span>
            <span className="decor-icon">&#9733;</span>
            <span className="decor-icon">&#9733;</span>
          </div>
          <div className="footer-credits">
            <p>© 2024 Flavor Fiesta. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeaderHomePage;
