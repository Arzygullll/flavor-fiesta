import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { handlePasswordReset } = useAuth();
  const navigate = useNavigate();
  const [emailOrLogin, setEmailOrLogin] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Adjust playback speed if needed
      videoRef.current.volume = 0.3; // Adjust volume level (0 to 1)
    }
  }, []);

  const handleResetPassword = async () => {
    if (!emailOrLogin.trim()) {
      alert(
        "Пожалуйста, введите ваш email или логин для восстановления пароля."
      );
      return;
    }

    try {
      await handlePasswordReset(emailOrLogin);
      alert("Ссылка для восстановления пароля отправлена на ваш email.");
      navigate("/login"); // Перенаправляем на страницу входа после успешного восстановления
    } catch (error) {
      alert("Ошибка при восстановлении пароля. Пожалуйста, попробуйте снова.");
      console.error("Ошибка восстановления пароля:", error);
    }
  };

  return (
    <div className="reset-password-container">
      <video autoPlay loop playsInline className="video-bg">
        <source src="/videos/restaurantvideo.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      <div className="reset-password-form">
        <h1>Восстановление пароля</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Ваш email или логин:
            <input
              type="text"
              value={emailOrLogin}
              onChange={(e) => setEmailOrLogin(e.target.value)}
              placeholder="Введите ваш email или логин"
            />
          </label>
          <button onClick={handleResetPassword}>Восстановить пароль</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
