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
      question: "1. What is the main ingredient in risotto?",
      options: ["Rice", "Pasta", "Potatoes", "Meat"],
      correctAnswer: "Rice",
    },
    {
      question: "2. What country does sushi come from?",
      options: ["China", "Japan", "South Korea", "Thailand"],
      correctAnswer: "Japan",
    },
    {
      question: "3. What sauce is used in classic Caesar?",
      options: ["Caesar", "Ranch", "Balsamic", "Soy sauce"],
      correctAnswer: "Caesar",
    },
    {
      question: "4. What fish is traditionally used in tartare?",
      options: ["Salmon", "Tuna", "Mackerel", "Herring"],
      correctAnswer: "Tuna",
    },
    {
      question: "5. What type of pasta is spaghetti shaped?",
      options: ["Penne", "Fusilli", "Spaghetti", "Ravioli"],
      correctAnswer: "Spaghetti",
    },
    {
      question: "6. What vegetable is used to make guacamole?",
      options: ["Tomato", "Avocado", "Cucumber", "Pepper"],
      correctAnswer: "Avocado",
    },
    {
      question: "7. What is foie gras?",
      options: ["Meat sauce", "Gourmet duck liver", "Cheese", "Fruit"],
      correctAnswer: "Exquisite duck liver",
    },
    {
      question:
        "8. What traditional Italian dessert is made from mascarpone cheese?",
      options: ["Tiramisu", "Panna Cotta", "Sofrito", "Cannoli"],
      correctAnswer: "Tiramisu",
    },
    {
      question: "9. What region does Parmesan cheese come from?",
      options: ["France", "Italy", "Spain", "Greece"],
      correctAnswer: "Italy",
    },
    {
      question: "10. What spice is used in traditional Thai curry?",
      options: ["Turmeric", "Coriander", "Cardamom", "Chili"],
      correctAnswer: "Turmeric",
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
    }, 1000);
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
          <h1>A celebration of tastes and culinary discoveries every day!</h1>
        </div>
      </section>

      <div className="main">
        <div className="overlay"></div>
        <video className="background-video" src={videoBg} autoPlay loop muted />
        <div className="content">
          <h4>
            Recipes, books, establishments - everything for chefs and cooking
            lovers. Let's discover new tastes of the world together!
          </h4>
        </div>
      </div>

      <section className="section3">
        <h2>Time for a cooking quiz!</h2>
        <p>
          Test how well you know delicious dishes and culinary trends. Good
          luck!
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
                {isCorrect ? "Right!" : "Wrong, try again."}
              </p>
            )}

            {showConfetti && <Confetti />}
          </div>
        ) : (
          <div className="quiz-results">
            <h3>Quiz is over!</h3>
            <p>Right answers: {score.correct}</p>
            <p>Incorrect answers: {score.incorrect}</p>
            <button className="restart-button" onClick={handleRestartQuiz}>
              Start again
            </button>
          </div>
        )}
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

export default HeaderHomePage;
